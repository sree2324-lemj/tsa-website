//this goes on line 29 <button onclick="addToSaves(${this.#filteredList[i][1]})" style="color:#d57146;font-size:1.5em">+</button>
class Resources {
  #filteredList;
  #rows;
  #filterOption;

  constructor() { 
    const selectElement = document.getElementById("js-resource-filter");
    selectElement.addEventListener('change', () => {
      this.inputHtml()
    });
  }
  async inputHtml() {
    await this.#filterResources();
    let resourceLikes = await this.#getLikes();
    console.log(resourceLikes);
    let resourceGrid = ``
    for (let i=0;i<this.#filteredList.length;i++) {
      resourceGrid += `
        <div style="border:6px solid #d57146;width:300px;height:250px; margin:25px">
          <div class="resource-link-pic-box">
            <img src=${this.#filteredList[i][2]} style="width:100%;height:100%;object-fit:cover;object-position:center">
          </div>
          <div style="display:flex;align-content:space-around;min-height:100px;background-color:#003e7a">
            <p style="color:white;font-size:20px;width:70%;margin:auto auto;text-align:center;font-weight:bold;"><a href=${this.#filteredList[i][1]}>${this.#filteredList[i][0]}</a></p>
            <div style="float:right;margin-right:10px;">
              <button style="color:#d57146;padding:5px" onclick="fetch('/likes', { method:'POST', headers:{'Content-Type':'text/plain'}, body:'${this.#filteredList[i][1]}' }); alert('Liked ${this.#filteredList[i][0]}');">
              &#10084;
              </button>
              <span style="margin-top:5px;margin-right:10px;color:white;font-weight:bold;font-size:1.4em">${resourceLikes[this.#filteredList[i][1]]}</span>
              
            </div>
          </div>
        </div>
      `;  
    }
    const resourceGridElement = document.getElementById('js-resource-grid');
    resourceGridElement.innerHTML = resourceGrid;
  }
  
  async #filterResources() {
    if (!this.#rows) {
      await this.#getResources();
    }
    
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
    this.#rows = text.split('\n').map(row=>row.split(',')).slice(1,-1); 
    console.log(this.#rows);
  }
  #getSelectedOption() {
    const selectElement = document.getElementById("js-resource-filter");
    this.#filterOption = selectElement.value;
    console.log(this.#filterOption)
  }
  async #getLikes() {
    const response = await fetch('resource_likes.json');
    const data = await response.json();
    return data;
  }
}
const rSources = new Resources();
rSources.inputHtml();
