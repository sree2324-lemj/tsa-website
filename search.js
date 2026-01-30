class Search {
  #rows;
  #searchText;
  #results;
  
  
  constructor() {
    const buttonElement = document.getElementById('js-search-button');
    buttonElement.addEventListener('click',() => {
      this.#loadSearchResults();
    });
  }
  
  async #loadSearchResults() {
    await this.#getSearchResults();
    let resultsBox = ``;
    if (!this.#results) {
      resultsBox = `<p style="font-size:64px;font-weight:bold;width:70%;margin-left:auto;margin-right:auto;text-align:center">No Results For '${this.#searchText}'</p>`;
    } else {
      for (let i=0;i<this.#results.length;i++) {
        resultsBox += `
          <div style="border-bottom:3px solid #d57146;padding:0 100px">
            <p style="font-size:64px;font-weight:bold"><a href=${this.#results[i][1]}>${this.#results[i][0]}</a></p>
            <p>Category: ${this.#results[i][3]}</p>
          </div>
        `;
      }
    }
    const divElement = document.getElementById('js-results-box');
    divElement.innerHTML = resultsBox;
  }
  
  async #getSearchResults() {
    if (!this.#rows) {
      await this.#getResources();
    }
    this.#getSearchText();
    
    if (this.#searchText==='') {
      this.#results = false;
      return;
    }
    
    this.#results = this.#rows.filter(row => row[0].toLowerCase().includes(this.#searchText.toLowerCase()));
    
    if (this.#results.length === 0) {
      this.#results = false;
    }
  }
  
  #getSearchText() {
    const inputElement = document.getElementById('js-search-bar');
    this.#searchText = inputElement.value.toLowerCase();
  }
  
  async #getResources() {
    
    const response = await fetch('resource-data.csv');
    const text = await response.text();
    this.#rows = text.split('\n').map(row=>row.split(',')).slice(1,-1); 
  }
}

const searchJs = new Search();
