class Resources {
  #filteredList;
  #rows;
  #filterOption;

  inputHtml() {
    this.#filterResources();
    for (let i=0;i<this.#filteredList.length;i++) {
      const resourceElement = document.getElementById('r'+i);
      const resourceContent = `
        <div style="background-image:linear-gradient(rgba(0, 62, 122, 0.75),rgba(0, 62, 122, 0.75)),url(${this.#filteredList[i][2]});
          height:150px;
          width:100%;
          background-blend-mode:multiply;
          background-size:cover;
          background-position:center;"></div>
        <p style="font-size:14px;width:70%;margin:auto auto"><a href=${this.#filteredList[i][1]}>${this.#filteredList[i][0]}</a></p>
      `;
      resourceElement.innerHTML = resourceContent;
      resoruceElement.style.border = "3px solid #003e7a";
      resourceElement.style.width = "300px";
      resourceElement.style.height = "250px";
      
    }
  }
  
  #filterResources() {
    this.#getResources();
    this.#getSelectedOption();

    if (this.#filterOption==='all') {
      this.#filteredList = this.#rows;
      return;
    }

    this.#filteredList = this.#rows.filter(row => row[3] === this.#filterOption);
  }
  
  #getResources() {
    const reader = new FileReader();
    reader.onlodad = (e) => {
      const text = e.target.results;
      this.#rows = text.split('\n').map(row=>row.split(',')); 
    };
  }
  #getSelectedOption() {
    const selectElement = document.getElementById("js-resource-filter");
    this.#filterOption = selectElement.value;
  }
}
const rSources = new Resources();
rSources.inputHtml();
