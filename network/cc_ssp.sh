#!/bin/bash

if [ $# -ne 2 ]; then
	echo "Arguments are missing. ex) ./cc_ssp.sh instantiate 1.0.0"
	exit 1
fi

instruction=$1
version=$2

set -ev

#chaincode install
docker exec peer0.org1.localGoverment.com peer chaincode install -n ssp -v $version -p github.com/ssp
#chaincode instatiate
docker exec peer0.org1.localGoverment.com peer chaincode $instruction -o orderer.centralGoverment.com:7050 -n ssp -v $version -C ssp -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member","Org3MSP.member")'
sleep 5
#chaincode invoke user1
docker exec peer0.org1.localGoverment.com peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addUser","user1","name1"]}'
sleep 5
#chaincode invoke add photo
docker exec peer0.org1.localGoverment.com peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addPhoto","testcontent","hashedcontent"]}'
sleep 5
#chaincode invoke add material
docker exec peer0.org1.localGoverment.com peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addMaterial","testcontent","hashedcontent","testcontent","testcontent","testcontent"]}'
sleep 5
#chaincode invoke add material rental
docker exec peer0.org1.localGoverment.com peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addMaterialRental","testcontent","hashedcontent","testcontent","testcontent","testcontent","true"]}'
sleep 5
#chaincode query material
docker exec peer0.org1.localGoverment.com peer chaincode query -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["getMaterial","testcontent"]}'

# chaincode invoke add data
# docker exec peer0.org1.localGoverment.com peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addQuantity","testcontent","hashedcontent","test","test","test"]}'
# sleep 5

echo '-------------------------------------END-------------------------------------'