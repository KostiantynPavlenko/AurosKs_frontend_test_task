import { View } from "dhx-optimus";

import { dataset } from "../data/auros_FE_test_task_dhx";
import { columns } from "../data/auros_FE_test_task_dhx";

export class CountriesGridView extends View{

    init(){
        const gridHeadeRowHeight = 40;
        const gridRowHeight = 80;

        function setWidthToColumnById(columnName, width){
            for(const column of columns){
                if(column.id === columnName) return column.width = width;
            }
        }

        function calculateGridHeight(dataset, rowHeight, headerRowHeight){
            const height = dataset.length * rowHeight + headerRowHeight + 2;
            return Math.min(height, window.innerHeight);
        }

        setWidthToColumnById("country", 150);

        let countriesGrid = new dhx.Grid(null, {
            columns: columns,
            data: dataset,
            headerRowHeight: gridHeadeRowHeight,
            rowHeight: gridRowHeight,
            autoWidth: true,
            height: calculateGridHeight(dataset, gridRowHeight, gridHeadeRowHeight),
        });

        this.drawInformationCard();

        countriesGrid.events.on("CellClick", (row, col, e) => {
            const target = e.target.closest('.myCustomCell');
            if (target) {
                
                const cellData = countriesGrid.data.getItem(row.id);
                
                if (!cellData) {
                    console.warn("Row data not found for row:", row);
                    return;
                }

                const infoCard = document.querySelector('.country-detail-info');
                infoCard.innerHTML = "";
                for(const item in cellData){
                    if(item !== "id" && item !== "$height"){
                        if(item === "country"){
                            let htmlString = cellData[item];
                        
                            const tempDiv = document.createElement("div");
                            tempDiv.innerHTML = htmlString;
    
                            const countryName = tempDiv.querySelector("span").textContent;
                            const imageUrl = tempDiv.querySelector("img").src;
                            
                            const countryNameElement = document.createElement("p");
                            countryNameElement.className = `${item}-text`;
                            countryNameElement.textContent = `${this.capitalizeFirstLetter(item)}: ${countryName}`;
                            infoCard.appendChild(countryNameElement);

                            const imageElement = document.createElement("img");
                            imageElement.src = imageUrl;
                            imageElement.alt = countryName;
                            imageElement.style.width = "50px";
                            imageElement.style.height = "30px";
                            infoCard.appendChild(imageElement);
                        }else{
                            const textElement = document.createElement("p");
                            textElement.textContent = `${this.capitalizeFirstLetter(item)}: ${cellData[item]}`;
                            infoCard.appendChild(textElement);
                        }
                    }
                }
            }
        });

        return countriesGrid;
    }

    drawInformationCard(){
        const countriesGridElement = document.getElementById("countries-grid");

        const newDiv = document.createElement("div");
        newDiv.className = "countries-information-card-wrapper";

        const newHeading = document.createElement("h2");
        newHeading.textContent = "Select Country for detail information";
        const counryDetailInfoDiv = document.createElement("div");
        counryDetailInfoDiv.className = "country-detail-info";
        newDiv.appendChild(newHeading);
        newDiv.appendChild(counryDetailInfoDiv);

        countriesGridElement.appendChild(newDiv);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    
}