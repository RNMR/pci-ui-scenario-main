
export class NumberFilter {
  eGui: any;
  rbAllYears: any;
  rbSince2010: any;
  filterActive: any;
  filterChangedCallback: any;

  init(params: any) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `<div class="year-filter">
                <div>Select Year Range</div>
                <label>  
                    <input type="radio" name="yearFilter" checked="true" id="rbAllYears" filter-checkbox="true"/> All
                </label>
                <label>  
                    <input type="radio" name="yearFilter" id="rbSince2010" filter-checkbox="true"/> remove empty
                </label>
            </div>`;
    this.rbAllYears = this.eGui.querySelector('#rbAllYears');
    this.rbSince2010 = this.eGui.querySelector('#rbSince2010');
    this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this));
    this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this));
    this.filterActive = false;
    this.filterChangedCallback = params.filterChangedCallback;
  }

  onRbChanged() {
    this.filterActive = this.rbSince2010.checked;
    this.filterChangedCallback();
  }

  getGui() {
    return this.eGui;
  }

  doesFilterPass(params: any) {
    return params.data.year > 0;
  }

  isFilterActive() {
    return this.filterActive;
  }

  // this example isn't using getModel() and setModel(),
  // so safe to just leave these empty. don't do this in your code!!!
  getModel() {}

  setModel() {}
}
