## ng-simple-dropdown

A dependency free Angular dropdown menu that is sleek, simple and fast.

### Examples

![image](https://cloud.githubusercontent.com/assets/329917/18288697/81205b8e-744a-11e6-9731-375298428789.png)
![image](https://cloud.githubusercontent.com/assets/329917/18288713/970c45ac-744a-11e6-9e9f-ace8190b2363.png)

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

#### Attributes

On the same element where you declared the `dropdown` directive, you can also
add some attributes to change the functionality of the dropdown.

| Attribute | Values | Description |
| --- | --- | --- |
| `dropdown-position` | right, left, center | Aligns the dropdown depending on this value and the position of the `dropdownToggle`. Default `right` |
| `dropdown-offset` | `Integer` | Adds extra pixels to the positioning of the dropdown. This is useful if you have an arrow on top of your dropdown that needs to be positioned correctly |
| `dropdown-lock-body-scroll` | `Boolean` | If this is set to `true`, it will lock the body preventing it from scrolling while the dropdown is open. Useful if you are using dropdown with some sort of scrolling |

### License

MIT.
