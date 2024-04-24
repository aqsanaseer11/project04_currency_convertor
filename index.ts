#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

//Curency convertor API link

let apiLink = " https://v6.exchangerate-api.com/v6/4f2a66c46eb2a2b4affb7e4d/latest/USD"

//Fetching Data

let fetchData = async (data: any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
}

let data = await fetchData(apiLink);

//Object to array

let countries = Object.keys(data);

//user input first country

let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from:",
    choices: countries,

})
console.log(`${chalk.greenBright.bold(firstCountry.name)}`)

//user input converting amount

let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please entere the amount in ${chalk.bgGreen.bold(firstCountry.name)}:`,
})

//user input second country

let scndCountry = await inquirer.prompt({
    type: "list",
    name: "name2",
    message: "Converting to:",
    choices: countries,
})
console.log(`${chalk.greenBright.bold(scndCountry.name2)}`)

//conversion rate

let cnv = `https://v6.exchangerate-api.com/v6/4f2a66c46eb2a2b4affb7e4d/pair/${firstCountry.name}/${scndCountry.name2}`;

let cnvData = async (data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};

let cnvRate = await cnvData(cnv);

let convertedRate = userMoney.rupee * cnvRate;

console.log(`"Your ${chalk.yellowBright.bold(firstCountry.name)} ${chalk.green.bold(userMoney.rupee)} in ${chalk.yellowBright.bold(scndCountry.name2)} is ${chalk.greenBright.bold(convertedRate)}"...`);