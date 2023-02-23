class Excel{
    constructor(content){
        this.content = content;
    }

    header(){
        return this.content[0];
    }

    rows(){
        return new RowCollection(this.content.slice(1,this.content.length));    
    }

}

class RowCollection{
    constructor(rows){
        this.rows = rows;
    }
    first(){
        return new Row( this.rows[0] )
    }

    get(index){
        return new Row( this.rows[index] )
    }

    count(){
        return this.rows.length;
    }
}

class Row{

    constructor(row){
        this.row = row
    }

    userId(){
        return this.row[0];
    }

    userName(){
        return this.row[1]
    }

    date(){
        return this.row[2]
    }

    punchIn(){
        return this.row[3]
    }

    punchOut(){
        return this.row[4]
    }
    
}

 class ExcelDisplay{
    static print(tableId, excel){
        const table = document.getElementById(tableId);
         excel.header().forEach( title => {
            table.querySelector("thead>tr").innerHTML += `<td>${title}</td>` 
        }) 

    for (let index = 0; index < excel.rows().count(); index++) {
        const row = excel.rows().get(index);
        table.querySelector("tbody").innerHTML += `
        <tr>
            <td>${row.userId()}</td>
            <td>${row.userName()}</td>
            <td>${row.date()}</td>
            <td>${row.punchIn()}</td>
            <td>${row.punchOut()}</td>
        </tr>`
        
        }
    }


    } 

const excelInput = document.getElementById("excelFile");

excelInput.addEventListener('change',async () => {
    const content = await readXlsxFile(excelInput.files[0]);
    const excel = new Excel(content)

    console.log(excel.rows().get(1).userId() );
    console.log( ExcelDisplay.print('tableId',excel) );

})

