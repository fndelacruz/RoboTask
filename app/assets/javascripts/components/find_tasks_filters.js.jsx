(function(root) {
  'use strict';
  // this.props.filters
  // this.props.filterChange.bind(null, currentSortType)
  var _filterNameCodes = {
    shuffled: "Randomize!",
    sortDateAscending: "Ascending Date",
    sortDateDescending: "Descending Date"
  };

  root.FindTasksFilters = React.createClass({
    render: function() {
      var filters = this.props.filters;
      var allSortTypes = Object.keys(filters);
      var that = this;
      return (
        <div className="panel">
          <div id="sort-tasks-header">Sort tasks by</div>
          <div className="btn-group" data-toggle="buttons" id="">
            {allSortTypes.map(function(sortType) {
              return (
                <label
                  className={filters[sortType] ?
                    "btn btn-primary active"
                  :
                    "btn btn-primary"
                  }
                  onClick={that.props.filterChange.bind(null, sortType)}
                  id=""
                >
                  <input type="checkbox" autoComplete="off" /> {_filterNameCodes[sortType]}
                </label>
              );
            })}
          </div>
        </div>
      );
    }
  });

}(this));
