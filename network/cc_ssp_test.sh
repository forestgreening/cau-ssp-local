#!/bin/bash

if [ $# -ne 2 ]; then
	echo "Arguments are missing. ex) ./cc_ssp.sh instantiate 1.0.0"
	exit 1
fi

instruction=$1
version=$2

set -ev

#chaincode install
docker exec cli peer chaincode install -n ssp -v $version -p github.com/ssp
#chaincode instatiate
docker exec cli peer chaincode $instruction -o orderer.centralGoverment.com:7050 -n ssp -v $version -C ssp -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member","Org3MSP.member")'
sleep 5
#chaincode invoke add material
docker exec cli peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addMaterial","testcontent","hashedcontent","testcontent","testcontent","1"]}'
sleep 5
#chaincode invoke add material rental
docker exec cli peer chaincode invoke -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["addMaterialRental","testcontent","hashedcontent","testcontent","testcontent","2","true"]}'
sleep 5
#chaincode query material
docker exec cli peer chaincode query -o orderer.centralGoverment.com:7050 -n ssp -C ssp -c '{"Args":["getMaterial","testcontent"]}'

echo '-------------------------------------END-------------------------------------'