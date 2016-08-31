
angular.module('myApp', [])
.component('main', {
  bindings: {
    dataFromInput: '<'
  },
  controller: function() {
    const ctrl = this;

    ctrl.foundPics = ['cats', 'dogs', 'dolphins', 'monkies'];


  },
  template: `
    <div>
      <h1>Flickr Searcher</h1>
      <p>{{ $ctrl.dataFromInput.data[0].email }}</p>
      <input-area></input-area>
      <display-area pictures="$ctrl.foundPics"></display-area>
    </div>
  `
})
.component('inputArea', {
  bindings: {
    input: '&'
  },
  controller: function($http) {
    const ctrl = this;

    ctrl.getData = function() {
      ctrl.loader = true;
      $http.get('http://localhost:8080/data.json')
      .then(function(response) {
        console.log(response);
        // console.log(response.data);
        ctrl.data = response.data;
        // console.log(ctrl.data);
      }, function(response) {
        console.log('fail');
        ctrl.data = response.data;
      })
      .finally(function() {
        ctrl.loader = false;
      });
    };

  },
  template: `
    <div>
      <button ng-click="$ctrl.getData()">Get Data</button>
    </div>
  `
})
.component('displayArea', {
  bindings: {
    pictures: '<'
  },
  controller: function() {
    const ctrl = this;
    ctrl.searchTerm = "cats";
  },
  template: `
    <div>
      <p> Searching Instagram for photos of {{ $ctrl.searchTerm }}</p>
      <div ng-repeat="info in $ctrl.pictures">
        <p>
          {{ info }}
        </p>
      </div>
    </div>
  `
});
