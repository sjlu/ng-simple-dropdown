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

      var setMargin = function (type, amount) {
        var menu = getChildElementByClass('dropdownMenu')
        angular.element(menu)[0].style['margin-' + type] = '-' + amount + 'px'
      }

      var setMenuOffset = function () {
        var menu = getChildElementByClass('dropdownMenu')
        var toggle = getChildElementByClass('dropdownToggle')

        var offset = 0

        var leftMargin = window.getComputedStyle(toggle).marginLeft.replace("px", "")
        offset = menu.clientWidth / 2 - leftMargin

        if (attrs.position === 'center') {
          offset = offset - toggle.offsetWidth / 2
        } else if (attrs.position === 'left') {
          offset = offset - toggle.offsetWidth
        }

        if (attrs.offset) {
          offset = offset - attrs.offset
        }

        if ($scope.showDropdown) {
          var viewport = menu.getBoundingClientRect()
          if (viewport.right - offset > window.innerWidth) {
            // for mobile devices, center
            if (window.innerWidth < 550) {
              offset = viewport.right - window.innerWidth + ((window.innerWidth - menu.clientWidth)/2)
            // for offscreen, just move it just enough so its
            // within the viewport
            } else {
              offset = (viewport.right - window.innerWidth) + 20
            }
          }

          setMargin('top', 0)
        } else {
          setMargin('top', 9999)
        }

        setMargin('left', offset)
      }

      var lockBodyScroll = function () {
        if (!attrs.lockScroll) {
          return
        }

        if ($scope.showDropdown) {
          var b = document.getElementsByTagName('body')[0]
          document.body.className += ' ngdialog-open'
        } else {
          document.body.className = document.body.className.replace('ngdialog-open', '').trim()
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
