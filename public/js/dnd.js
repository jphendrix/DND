/*global $*/

//The dnd_data is in the format of:
/*
    {
    category_1:{description:"discriptive text", table:{columns:['header_1','header_2'],rows:['cell_1','cell_2']}},
    category_2:{description:"discriptive text", table:{columns:['header_1','header_2'],rows:['cell_1','cell_2']}},
    [...]
    }
*/
let dnd_data = {};


//This is a jquery function that will file when the page loads
$(function(){
    
    //We could have included the json as a refrence in th HTML
    //but sometimes it is better to load large data files later.
    //Loading big files can make the page load slow.  Doing it
    //later makes the site feel faster
    
    //This is a jquery function to read a json file
    $.getJSON( `js/dnd_data.json`, function( data ) {
        dnd_data = data; //Save the json data to our variable so that we can refrence it again later.
      
        //populate the dropdown element in the HTML will all the categories in the dnd_data
        for(let category in dnd_data){
            $("select[name=category]").append($("<option>",{text:dnd_data[category].description,value:category}));
        }
        
        //Create an event listener.  Anytime the user selects
        //a category in the dropdown, the function `parseCategory` will
        //be called with the selected category passed as an argument.
        $("select[name=category]").on("change",function(e){
            
            //Get the category selected by the user
            let category = $("select[name=category]").val();
            
            //Show the user all of the items for the selected category
            parseCatgory(category);
        })
        
        //Create an event listner for a button.  When the user clicks the
        //button, your function will execute.
        //Hint: <button name=MyButtonThatNeedsAGoodName>Click Me!</button>
        $("button[name=MyButtonThatNeedsAGoodName]").on("click",function(e){
            doSomething();
        });
    });
})

//This function reads all of the itmes in the category table and
//formats them into an HTML table.
function parseCatgory(category){
    
    //We might already have an HTML table.  Delete what is there
    $("div[name=catalog] div.table").empty();
    
    //Create a new table element
    let table = $("<table>");
    
    //Create a new row for a header
    let tr_heading = $("<tr>");
    
    //Get the data table for the chosen category
    let category_table = dnd_data[category].table;
    
    //For each column in the category table, add a header element to the header row
    for(let i=0; i<category_table.columns.length; i++){
        
        //Create the HTML header cell
        let th_cell = $("<th>",{text:category_table.columns[i]});
        
        //Add the header cell to the header row
        tr_heading.append(th_cell);
    }
    
    //Add the header row to the HTML table
    table.append(tr_heading);
    
    //Create a data row in the HTML table for each row in the category table
    for(let i=0; i<category_table.rows.length; i++){
        
        //Create the row
        let tr_row = $("<tr>");
        
        //A rows is made up of cells
        let cells = category_table.rows[i];
        
        //For each cell in the cells, add the data tot he HTML row
        for(let c=0; c<cells.length; c++){
            
            //Create the HTML row cell
            let td_cell = $("<td>",{text:cells[c]});
            
            //Add the HTML row cell to the row
            tr_row.append(td_cell);
        }
        
        //Add the row to the HTML table
        table.append(tr_row);
    }
    
    //Add the table to the div in the HTML body
    $("div[name=catalog] div.table").append(table);  
}

function getRandomItem(category){
    if(typeof category == "undefined"){
        //We did not get an argument.  Turn it into an emapy array.
        category = [];
    }
    
    if(typeof category == "string"){
        //We just have one category but we were expecting an array.  Fix it.
        category = [category];
    }
    
    
    if(category.length<1){
        //No categories were passed.  The user wants all of them!
        for(let key in dnd_data){
            category.push(key);
        }
    }
    
    //Get a random number between 0 and the number of categories (minus one b/c the fist element is at index zero)
    let random_category_index = getRandomNumber(category.length-1)
    
    //Select a random category table from the list
    let random_category = category[random_category_index].table;
    
    //select a random number between 0 and the number of items in the category
    let randome_item_index = getRandomNumber(random_category.rows.length-1);
    
    //select a random item
    let random_item = random_category.rows[randome_item_index];
    
    //This is just for debugging.  It is helpful to see what the program is doing but this should be removed before "going live"
    console.log(`We selected ${JSON.stringify(random_item)} at random from ${random_category}`);
    
    //build object for retury (merge column headers and values into a single object)
    let result={}
    for(let i=0; i<random_category.columns.length; i++){
        o[random_category.columns[i]] = random_item[i];  
    }
    
    return result;
}

//TODO: What do you want to do?
function doSomething(){
    alert('I did something');
    
    //Maybe call getRandomItem()?  Maybe something else?
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
