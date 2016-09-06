## ng-simple-dropdown

A dependency free Angular dropdown menu that sleek and simple. This module
infers the following

### Install

* Install the following bower component

    ```
    bower install ng-simple-dropdown --save
    ```

* Add [dropdown.js](dropdown.js) to your page, then add it to your list of
Angular modules like so.


    ```
    angular.module('app', [
      'ng-simple-dropdown'
    ])
    ```

* Optional: Reference [dropdown.css](dropdown.css) stylesheet or modify for your
own styles. In fact, if you plan on putting your own content inside the dropdown
you will definitely need to make your own.

### Usage

This is just a short example how you can use dropdown with the default
options and styles provided in this repository.

```
<div dropdown>
  <i class="icon ion-more dropdownToggle"></i>
  <div class="dropdownMenu" ng-show="showDropdown">
    <a ng-click="editPost()>Edit</a>
  </div>
</div>
```

* Note `dropdown` is required to to specify the start of a directive.
* You'll need the `.dropdownToggle` class as a specification to what will
open the the `.dropdownMenu`
* `ng-show="showDropdown"` is also required if you want to actually toggle, this
is done so that your controller can actually watch this variable.

### License

MIT.
