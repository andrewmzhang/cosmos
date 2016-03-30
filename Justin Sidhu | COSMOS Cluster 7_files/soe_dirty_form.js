var soe_dirty_form_submitted = false;

function soe_dirty_form_init() {
  var forms = document.getElementsByTagName("form");

  var x = 0;

  for (x = 0; x < forms.length; x++) {
    var form = forms[x];

    form.onsubmit = soe_dirty_form_submit;
  }
}

function soe_dirty_form_submit() {
  soe_dirty_form_submitted = true;
}

function soe_dirty_form_check() {
  if (soe_dirty_form_submitted) {
    return;
  }

  var warning = "Are you sure you want to navigate away from this page?  All your changes will be lost!";

  var forms = document.getElementsByTagName("form");

  var x = 0;

  for (x = 0; x < forms.length; x++) {
    var form = forms[x];

    for (var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i];

      var type = element.type;

      if (type == "checkbox" || type == "radio") {
        if (element.checked != element.defaultChecked) {
          return warning;
        }
      } else if (type == "hidden" || type == "password" || type == "text" || type == "textarea") {
        if (element.value != element.defaultValue) {
          return warning;
        }
      } else if (type == "select-one" || type == "select-multiple") {
        for (var j = 0; j < element.options.length; j++) {
          if (element.options[j].selected != element.options[j].defaultSelected) {
            return warning;
          }
        }
      }
    }
  }

  if (typeof tinyMCE != 'undefined') {
    for (editor in tinyMCE.editors) {
      if (tinyMCE.editors[editor].isDirty()) {
        return warning;
      }
    }
  }
}

window.onload = soe_dirty_form_init;
window.onbeforeunload = soe_dirty_form_check;
