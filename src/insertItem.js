"use strict"

const {v4} = require("uuid");
const AWS = require("aws-sdk");

module.exports.insertItem = async (event) => {

	const {item} = JSON.parse(event.body);
	const createdAt = new Date().toString();
	const id = v4();

	const dinamoDB = new AWS.DynamoDB.DocumentClient();

	const newItem = {
		id,
		item,
		createdAt,
		itemStatus: false
	}; 

	await dinamoDB.put(
		{
			TableName:"ItemTableNew",
			Item: newItem
		}
	);

	return {
		statusCode: 200,
		body: JSON.stringify(newItem)
	};
}
