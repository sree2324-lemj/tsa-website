class Resources {
  #filteredList;
  #rows;
  #filterOption;

  async inputHtml() {
    await this.#filterResources();
    let resourceGrid = ``
    for (let i=0;i<this.#filteredList.length;i++) {
      resourceGrid += `
        <div style="border:3px solid #003e7a;width:300px;height:250px"
        <div style="background-image:linear-gradient(rgba(0, 62, 122, 0.75),rgba(0, 62, 122, 0.75)),url(${this.#filteredList[i][2]});
          height:150px;
          width:100%;
          background-blend-mode:multiply;
          background-size:cover;
          background-position:center;"></div>
        <p style="font-size:14px;width:70%;margin:auto auto"><a href=${this.#filteredList[i][1]}>${this.#filteredList[i][0]}</a></p>
        </div>
      `;  
    }
    resourceGridElement = document.getElementById('js-resource-grid');
    resourceGridElement.innerHTML = resourceGrid;
  }
  
  async #filterResources() {
    await this.#getResources();
    this.#getSelectedOption();

    if (this.#filterOption==='all') {
      this.#filteredList = this.#rows;
      return;
    }

    this.#filteredList = this.#rows.filter(row => row[3] === this.#filterOption);
  }
  
  async #getResources() {
    const response = await fetch('resource-data.csv');
    const text = await response.text();
    this.#rows = text.split('\n').map(row=>row.split(',')).slice(1); 
  }
  #getSelectedOption() {
    const selectElement = document.getElementById("js-resource-filter");
    this.#filterOption = selectElement.value;
  }
}
const rSources = new Resources();
rSources.inputHtml();
