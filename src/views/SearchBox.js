export class SearchBox{

    constructor(containerId){
        this.container = document.getElementById(containerId);
        this.searchHistory = [];

        this.render();
        this.attachEventHandlers();
    }

    render(){
        this.container.innerHTML = `
            <div class="search-box">
                <div class="input-wrapper">                
                <input type="text" id="search-input" autocomplete="off" placeholder="Enter search term..." />
                <div id="dropdown" class="dropdown"></div>
                <button id="search-clear" title="Clear" class="icon-button">
                    <span class="material-icons">clear</span>
                </button>
                </div>
                <button id="search-button" title="Search" class="icon-button">
                    <span class="material-icons">search</span>
                </button>
                
            </div>
        `;
    }

    attachEventHandlers() {
        this.searchInput = this.container.querySelector("#search-input");
        this.searchClear = this.container.querySelector("#search-clear");
        const searchButton = this.container.querySelector("#search-button");
        this.dropdown = this.container.querySelector("#dropdown");

        this.hideClearInputButton();

        this.searchInput.addEventListener("input", () => {
            this.handleSearchInput();
        });

        this.searchClear.addEventListener("click", () => {
            this.clearSearchValue();
            this.clearDropdown();
            this.hideClearInputButton();
        });

        searchButton.addEventListener("click", () => {
            this.addToSearchHistory();
            this.clearDropdown();
        });

        this.searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.searchInput.blur();
                this.addToSearchHistory();
                this.clearDropdown();
            }
        });

        this.searchInput.addEventListener("focus", () => {
            if (this.getSearchInputValue() !== "") {
                this.showClearInputButton();
            } else {
                this.hideClearInputButton();
            }
            if (this.searchHistory.length > 0) {    
                this.updateDropdown(this.getSearchInputValue());
                this.showDropdown();
            }
        });

        document.addEventListener("click", (event) => {
            if (!this.container.contains(event.target)) {
                this.clearDropdown();
                this.hideClearInputButton();
            }
        });

    }

    getSearchInputValue(){
        return this.searchInput.value.trim();
    }

    showClearInputButton(){
        this.searchClear.style.display = "block";
    }
    hideClearInputButton(){
        this.searchClear.style.display = "none";
    }

    addToSearchHistory() {
        const value = this.getSearchInputValue();
        if (value) {
            const existingIndex = this.searchHistory.indexOf(value);
            if (existingIndex !== -1) {
                return;
            }else{
                this.searchHistory.unshift(value);
                this.updateDropdown();
            }
        }
    }

    clearSearchValue(){
        this.searchInput.value = "";
    }

    showDropdown() {
        this.dropdown.style.display = "flex";
    }

    hideDropdown() {
        this.dropdown.style.display = "none";
    }

    clearDropdown() {
        this.dropdown.innerHTML = "";
        this.hideDropdown();
    }

    handleSearchInput() {
        const inputValue = this.getSearchInputValue();
        if (inputValue !== "") {
            this.showClearInputButton();
            this.updateDropdown(inputValue);
        } else {
            this.hideClearInputButton();
            this.updateDropdown();
        }
    }

    updateDropdown(filterText = "") {
        let filteredItems;
    
        if (filterText === "") {
            filteredItems = this.searchHistory;
        } else {
            filteredItems = this.searchHistory.filter(item => 
                item.toLowerCase().includes(filterText.toLowerCase())
            );
        }

        if (filteredItems.length > 0) {
            this.showDropdown();
            this.dropdown.innerHTML = filteredItems.map(item => `<div class="dropdown-item"><img src="../assets/img/history-icon.svg">${item}</div>`).join("");
        } else {
            this.hideDropdown();
        }

        this.dropdown.querySelectorAll(".dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                this.searchInput.value = item.textContent;
                this.hideDropdown();
            });
        });
    }
}