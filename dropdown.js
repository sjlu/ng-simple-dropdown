var app = angular.module('ng-simple-dropdown', [])

app.directive('dropdown', function ($document, $window, $timeout, dropdownService) {
  return {
    restrict: 'A',
    link: function ($scope, element, attrs) {
      function getChildElementByClass (className) {
        var children = angular.element(element).children()
        var menu = null
        for (var i = 0; i < children.length; i++) {
          if (children[i].className.indexOf(className) > -1) {
            return children[i]
          }
        }
      }

      $scope.showDropdown = false

      element.bind("click", function () {
        $scope.$element = getChildElementByClass('dropdownToggle')
        dropdownService.setActive($scope)
      })

      $scope.topOffset = 0
      $scope.leftOffset = 0

      var setMargin = function (type, amount) {
        var menu = getChildElementByClass('dropdownMenu')
        angular.element(menu)[0].style['margin-' + type] = '-' + amount + 'px'
      }

      $scope.$watch('leftOffset', function () {
        setMargin('left', $scope.leftOffset)
      })

      $scope.$watch('topOffset', function () {
        setMargin('top', $scope.topOffset)
      })

      var setMenuOffset = function () {
        var menu = getChildElementByClass('dropdownMenu')
        var toggle = getChildElementByClass('dropdownToggle')

        var offset = 0

        var leftMargin = window.getComputedStyle(toggle).marginLeft.replace("px", "")
        offset = menu.clientWidth / 2 - leftMargin

        if (attrs.dropdownPosition === 'center') {
          offset = offset - toggle.offsetWidth / 2
        } else if (attrs.dropdownPosition === 'left') {
          offset = offset - toggle.offsetWidth
        }

        if (attrs.dropdownOffset) {
          offset = offset + parseInt(attrs.dropdownOffset)
        }

        if ($scope.showDropdown) {
          // this part helps keep the dropdown within
          // the viewport itself, especially useful for mobile devices
          var viewport = menu.getBoundingClientRect()
          if (viewport.right - offset > window.innerWidth) {
            // this is if somehow our dropdown menu is larger than what
            /// the device supports, we will just center it
            if (viewport.width > window.innerWidth) {
              offset = viewport.right - window.innerWidth + ((window.innerWidth - menu.clientWidth)/2)
            // for offscreen, just move it just enough so its
            // within the viewport
            } else {
              offset = (viewport.right - window.innerWidth) + 10
            }
          }

          $scope.topOffset = 0

          // this is done so that after the first shown we don't
          // incorrectly set the leftOffset since viewport.right
          // change depending on the leftOffset
          if (!$scope.leftOffset) {
            $scope.leftOffset = offset
          }
        } else {
          // this helps us hide the element off the page but keeps it
          // still visible so that the DOM can properly do its calculations
          $scope.topOffset = 9999
        }
      }

      var lockBodyScroll = function () {
        if (!attrs.dropdownLockBodyScroll) {
          return
        }

        if ($scope.showDropdown) {
          var b = document.getElementsByTagName('body')[0]
          document.body.className += ' ngsimpledropdown-scroll-lock'
        } else {
          document.body.className = document.body.className.replace('ngsimpledropdown-scroll-lock', '').trim()
        }
      }

      $scope.$watch('showDropdown', function () {
        $timeout(function () {
          setMenuOffset()
        })
        lockBodyScroll()
      })
    }
  }
})

app.service('dropdownService', function ($document) {
  var activeDropdownScope = null

  var _removeActive = function () {
    if (!activeDropdownScope) {
      return
    }

    activeDropdownScope.$apply(function () {
      activeDropdownScope.showDropdown = false
    })

    var scope = activeDropdownScope
    activeDropdownScope = null
    return scope
  }

  this.removeActive = _removeActive

  this.setActive = function (scope) {
    if (activeDropdownScope) {
      var prevScope = _removeActive()
      if (prevScope === scope) {
        return
      }
    }

    scope.$apply(function () {
      scope.showDropdown = true
    })
    activeDropdownScope = scope
  }

  var body = $document.find('body')
  body.bind('click', function ($event) {
    if (activeDropdownScope) {
      if ($event.target !== activeDropdownScope.$element && !activeDropdownScope.$element.contains($event.target)) {
        _removeActive()
      }
    }
  })
})
