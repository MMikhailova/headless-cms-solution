/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * taking into consideration that it's impossible to buy items that are out of stuck,
 * and taking the discount rates into account
 */

import "./qs.js";
async function ex6() {
  const query = qs.stringify(
    {
      populate: ["discount"],
      fields: ["price", "outOfStock"],
      filters: {
        outOfStock: {
          $ne: true,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  // call the matching endpoint and include the querystring after the ?
  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();
  console.log(result.data);
  let sum = 0;
  for (const obj of result.data) {
    const rate = obj.attributes.discount.data;
    obj.attributes.discount.data === null
      ? (sum += obj.attributes.price)
      : (sum += obj.attributes.price * (1 - rate.attributes.percentage / 100));
  }
  console.log(sum);
}

//   let sum=0;
//    for (const obj of result.data) {
//      debugger;
//      obj.attributes.discount.data === null? sum+=obj.attributes.price:
//  sum += obj.attributes.price * obj.attributes.discount.percentage/100
//  }
//  console.log(sum)}

ex6();

//  http://localhost:1337/api/products?populate=discount&fields[0]=price&fields[1]=outOfStock&filters[outOfStock][$eq]=false
