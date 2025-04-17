const defaultSettings = {
  triggerSelector: "[data-trigger]",
  activeTargetElementClass: "is-visible",
  activeTriggerClass: "is-active",
};

export class Toggleable_Version_1 {
  constructor(element, customSettings = {}) {
    this.settings = { ...defaultSettings, ...customSettings };
    this.targetElement = element;
    this.isActive = false;
    this.triggers = Array.from(
      document.querySelectorAll(`[data-target="#${this.targetElement.id}"]`)
    );
    this.bindHandleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    console.log("init");

    document.addEventListener("click", this.bindHandleClick);
  }

  open() {
    this.updateAriaAttributes();
    this.targetElement.classList.add(this.settings.activeTargetElementClass);
    this.isActive = true;
    this.triggers.forEach((trigger) => {
      trigger.classList.add(this.settings.activeTargetElementClass);
    });
  }

  close() {
    this.updateAriaAttributes();
    this.targetElement.classList.remove(this.settings.activeTargetElementClass);
    this.isActive = false;
    this.triggers.forEach((trigger) => {
      trigger.classList.remove(this.settings.activeTargetElementClass);
    });
  }

  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  updateAriaAttributes() {
    this.targetElement.setAttribute("aria-hidden", this.isActive);
    this.triggers.forEach((trigger) => {
      trigger.setAttribute("aria-expanded", !this.isActive);
    });
  }

  reset() {
    document.removeEventListener("click", this.bindHandleClick);
    this.triggers.forEach((button) => {
      button.removeAttribute("aria-expanded");
      button.classList.remove("is_active");
    });

    this.targetElement.removeAttribute("aria-hidden");
  }

  handleClick(e) {
    console.log("handleClick");

    if (this.triggers.includes(e.target)) {
      if (e.target.getAttribute("data-trigger") === "close") {
        this.close();
      } else {
        this.toggle();
      }
    } else if (!this.targetElement.contains(e.target)) {
      this.close();
    }
  }
}

export class Toggleable {
  static instances = [];
  static isEventDelegated = false;

  constructor(element, customSettings = {}) {
    this.settings = { ...defaultSettings, ...customSettings };
    this.targetElement = element;
    this.isActive = false;
    this.triggers = Array.from(
      document.querySelectorAll(`[data-target="#${this.targetElement.id}"]`)
    );

    Toggleable.instances.push(this);
    this.init();
  }

  init() {
    console.log("init");
    if (!Toggleable.isEventDelegated) {
      document.body.addEventListener("click", Toggleable.handleDelegatedClick);
      Toggleable.isEventDelegated = true;
    }
  }

  static handleDelegatedClick(e) {
    const targetSelector = e.target.getAttribute("data-target");
    if (!targetSelector) return;

    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;

    const toggleableInstance = Toggleable.instances.find(
      (instance) => instance.targetElement === targetElement
    );
    if (toggleableInstance) {
      toggleableInstance.handleClick(e);
    }
  }

  open() {
    this.updateAriaAttributes();
    this.targetElement.classList.add(this.settings.activeTargetElementClass);
    this.isActive = true;
    this.triggers.forEach((trigger) => {
      trigger.classList.add(this.settings.activeTriggerClass);
    });
  }

  close() {
    this.updateAriaAttributes();
    this.targetElement.classList.remove(this.settings.activeTargetElementClass);
    this.isActive = false;
    this.triggers.forEach((trigger) => {
      trigger.classList.remove(this.settings.activeTriggerClass);
    });
  }

  toggle() {
    this.isActive ? this.close() : this.open();
  }

  updateAriaAttributes() {
    this.targetElement.setAttribute("aria-hidden", this.isActive);
    this.triggers.forEach((trigger) => {
      trigger.setAttribute("aria-expanded", !this.isActive);
    });
  }

  reset() {
    Toggleable.instances = Toggleable.instances.filter(
      (instance) => instance !== this
    );

    this.triggers.forEach((trigger) => {
      trigger.removeAttribute("aria-expanded");
      trigger.classList.remove(this.settings.activeTriggerClass);
    });

    this.targetElement.removeAttribute("aria-hidden");
    this.targetElement.classList.remove(this.settings.activeTargetElementClass);
  }

  handleClick(e) {
    if (this.triggers.includes(e.target)) {
      if (e.target.getAttribute("data-trigger") === "close") {
        this.close();
      } else {
        this.toggle();
      }
    } else if (!this.targetElement.contains(e.target)) {
      this.close();
    }
  }
}
