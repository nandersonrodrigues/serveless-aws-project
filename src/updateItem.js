"use strict"

AWS = require("aws-sdk");

module.exports.updateItem = async (event) => {

	const dynamoDB = new AWS.DynamoDB.DocumentClient();
	
	const {itemStatus} = event.JSON.parse(event.body);
	const {id} = event.pathParameters;

	await dynamoDB.update({
		TableName: "ItemTableNew",
		Key: {id},
		UpdateExpression: "set itemStatus = :itemStatus",
		ExpressionAttributeValues: {
			":itemStatus" : itemStatus
		},
		ReturnValues: "ALL_NEW"
	}).promise();

	return {
		statusCode: 200,
		body: JSON.stringify({
			msg: "Item updated"
		})
	};
}