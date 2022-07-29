// TODO: rewrite the whole logic to a single web component

const selectors = {
  customerAddresses: "[data-customer-addresses]",
  addressCountrySelect: "[data-address-country-select]",
  addressContainer: "[data-address]",
  toggleAddressButton: "button[aria-expanded]",
  cancelAddressButton: "button[type='reset']",
  deleteAddressButton: "button[data-confirm-message]",
};

const attributes = {
  expanded: "aria-expanded",
  confirmMessage: "data-confirm-message",
};

const Shopify = window.Shopify;

class CustomerAddresses {
  constructor() {
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  _getElements() {
    const container = document.querySelector(selectors.customerAddresses);
    return container
      ? {
          container,
          addressContainer: container.querySelector(selectors.addressContainer),
          toggleButtons: document.querySelectorAll(
            selectors.toggleAddressButton
          ),
          cancelButtons: container.querySelectorAll(
            selectors.cancelAddressButton
          ),
          deleteButtons: container.querySelectorAll(
            selectors.deleteAddressButton
          ),
          countrySelects: container.querySelectorAll(
            selectors.addressCountrySelect
          ),
        }
      : {};
  }

  _setupCountries() {
    if (Shopify && Shopify.CountryProvinceSelector) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        "AddressCountryNew",
        "AddressProvinceNew",
        {
          hideElement: "AddressProvinceContainerNew",
        }
      );
      this.elements.countrySelects.forEach((select) => {
        const formId = select.dataset.formId;
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(
          `AddressCountry_${formId}`,
          `AddressProvince_${formId}`,
          {
            hideElement: `AddressProvinceContainer_${formId}`,
          }
        );
      });
    }
  }

  _setupEventListeners() {
    this.elements.toggleButtons.forEach((element) => {
      element.addEventListener("click", this._handleAddEditButtonClick);
    });
    this.elements.cancelButtons.forEach((element) => {
      element.addEventListener("click", this._handleCancelButtonClick);
    });
    this.elements.deleteButtons.forEach((element) => {
      element.addEventListener("click", this._handleDeleteButtonClick);
    });
  }

  _toggleExpanded(target) {
    target.setAttribute(
      attributes.expanded,
      (target.getAttribute(attributes.expanded) === "false").toString()
    );
  }

  _handleAddEditButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(currentTarget);
  };

  _handleCancelButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(
      currentTarget
        .closest(selectors.addressContainer)
        .querySelector(`[${attributes.expanded}]`)
    );
  };

  _handleDeleteButtonClick = ({ currentTarget }) => {
    // eslint-disable-next-line no-alert
    if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
      Shopify.postLink(currentTarget.dataset.target, {
        parameters: { _method: "delete" },
      });
    }
  };
}
window.CustomerAddresses = CustomerAddresses;

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == "undefined") {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (let i = 0, count = selector.options.length; i < count; i++) {
    let option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent("on" + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  let method = options["method"] || "post";
  let params = options["parameters"] || {};

  let form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (let key in params) {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (
  country_domid,
  province_domid,
  options
) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(
    options["hideElement"] || province_domid
  );

  Shopify.addListener(
    this.countryEl,
    "change",
    Shopify.bind(this.countryHandler, this)
  );

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    let value = this.countryEl.getAttribute("data-default");
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function () {
    let value = this.provinceEl.getAttribute("data-default");
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function () {
    const opt = this.countryEl.options[this.countryEl.selectedIndex];
    const raw = opt.getAttribute("data-provinces");
    const provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = "none";
    } else {
      for (let i = 0; i < provinces.length; i++) {
        const opt = document.createElement("option");
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (let i = 0; i < values.length; i++) {
      let opt = document.createElement("option");
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  },
};
