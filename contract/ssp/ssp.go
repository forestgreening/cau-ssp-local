package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type UserInfo struct {
	LoginId string `json:"loginId"`
	Name    string `json:"name"`
}
type Photo struct {
	ImageUrl string `json:"imageUrl"`
	Hash     string `json:"hash"`
}

type MaterialData struct {
 	FileName         string `json:"fileName"`
 	ContractQuantity string `json:"contractQuantity"`
 	CompanyName      string `json:"companyName"`
 	Quantity         string `json:"quantity"`
 	Date             string `json:"date"`
}

type MaterialRentalData struct {
	FileName         string `json:"fileName"`
	ContractQuantity string `json:"contractQuantity"`
	CompanyName      string `json:"companyName"`
	Quantity         string `json:"quantity"`
	Date             string `json:"date"`
	Match 			 string `json:"match"`
}

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()

	if function == "addUser" {
		return s.addUser(APIstub, args)
	} else if function == "addPhoto" {
		return s.addPhoto(APIstub, args)
	} else if function == "addMaterial" {
		return s.addMaterial(APIstub, args)
	} else if function == "addMaterialRental" {
		return s.addMaterialRental(APIstub, args)
	} else if function == "getMaterial" {
		return s.getMaterial(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) addUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("fail!")
	}
	var user = UserInfo{LoginId: args[0], Name: args[1]}
	userAsBytes, _ := json.Marshal(user)
	APIstub.PutState(args[0], userAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) addPhoto(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	var photo = Photo{ImageUrl: args[0], Hash: args[1]}
	photoAsBytes, _ := json.Marshal(photo)
	APIstub.PutState(args[0], photoAsBytes)

	return shim.Success(nil)
}

 func (s *SmartContract) addMaterial(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
 	if len(args) != 5 {
 		return shim.Error("Incorrect number of arguments. Expecting 5")
 	}
 	var data = MaterialData{FileName: args[0], ContractQuantity: args[1], CompanyName: args[2], Quantity: args[3], Date: args[4]}
 	dataAsBytes, _ := json.Marshal(data)
 	APIstub.PutState(args[0], dataAsBytes)

 	return shim.Success(nil)
 }

 func (s *SmartContract) addMaterialRental(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 6")
	}
	var data = MaterialRentalData{FileName: args[0], ContractQuantity: args[1], CompanyName: args[2], Quantity: args[3], Date: args[4], Match: args[5]}
	dataAsBytes, _ := json.Marshal(data)
	APIstub.PutState(args[0], dataAsBytes)

	return shim.Success(nil)
}

 func (s *SmartContract) getMaterial(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	MaterialAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(MaterialAsBytes)
}

func main() {
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
