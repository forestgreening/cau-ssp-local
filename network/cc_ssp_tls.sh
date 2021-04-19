#!/bin/bash

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/centralGoverment.com/orderers/orderer.centralGoverment.com/msp/tlscacerts/tlsca.centralGoverment.com-cert.pem

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
docker exec cli peer chaincode $instruction -o orderer.centralGoverment.com:7050 --tls --cafile $ORDERER_CA -n ssp -v $version -C ssp -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member","Org3MSP.member")'
sleep 5
#chaincode invoke user1
docker exec cli peer chaincode invoke -o orderer.centralGoverment.com:7050 --tls --cafile $ORDERER_CA -n ssp -C ssp -c '{"Args":["addUser","user1","name1"]}'
sleep 5
#chaincode invoke add photo
docker exec cli peer chaincode invoke -o orderer.centralGoverment.com:7050 --tls --cafile $ORDERER_CA -n ssp -C ssp -c '{"Args":["addPhoto","testcontent","hashedcontent"]}'
sleep 5

echo '-------------------------------------END-------------------------------------'