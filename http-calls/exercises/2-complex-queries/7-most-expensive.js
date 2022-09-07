/**
 * Fill in the blanks to create a script 
 * that prints the name of the most expensive item that someone can buy (after applying any discounts,
 * and not including any items that are out of stock)
 */

 import "./qs.js";
 async function searchTheMostExpensive() {
     const query = qs.stringify(
    {
      populate: ["discount"],
      fields: ["name","price", "outOfStock"],
      filters: {
        $or: [
      {
        outOfStock: {
          $eq: false,
        },
      },
      {
        outOfStock: {
          $null: `null`,
        },
      },
    ],
      }}, 
   {
     encodeValuesOnly: true,
   });
   console.log("The query string", query);
 
   // call the matching endpoint and include the querystring after the ?
   const baseUrl = "http://localhost:1337/api/products";
   const response = await fetch(`${baseUrl}?${query}`);
   const result = await response.json();
   var max=0;
   var name;
   var finalItemPrice
   for (const obj of result.data) {
    const rate = obj.attributes.discount.data;
    rate === null?
    finalItemPrice = obj.attributes.price:
    finalItemPrice = obj.attributes.price * (1 - rate.attributes.percentage / 100);
       if(max < finalItemPrice) {
         name=obj.attributes.name
         max=finalItemPrice
   }
 }
 console.log(name)
 }
 
 searchTheMostExpensive()