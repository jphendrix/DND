let db = {};


$(function(){
    $.getJSON( `js/db.json`, function( data ) {
        db = data;
      
        for(let key in db){
            $("select[name=category]").append($("<option>",{text:db[key].description,value:key}));
        }
        
        $("select[name=category]").on("change",function(e,d){
            let cat = $("select[name=category]").val();
            parseCat(cat);
        })
    });
})

function parseCat(cat){
    $("div[name=catalog] div.table").empty();
    let table = $("<table>");
    
    let tr_heading = $("<tr>");
    for(let i=0; i<db[cat].table.columns.length; i++){
        tr_heading.append( $("<th>",{text:db[cat].table.columns[i]}) );
    }
    table.append(tr_heading);
    
    for(let i=0; i<db[cat].table.rows.length; i++){
        let tr_row = $("<tr>");
        for(let c=0; c<db[cat].table.columns.length; c++){
            tr_row.append($("<td>",{text:db[cat].table.rows[i][c]}))
        }
        table.append(tr_row);
    }
    
    $("div[name=catalog] div.table").append(table);  
    
}