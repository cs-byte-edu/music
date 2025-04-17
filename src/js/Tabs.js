export class Tabs {
  constructor(tabList) {
    this.tabs = Array.from(tabList.querySelectorAll("[role=tab]"));
    this.tabPanels = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.init();
  }

  init() {
    for (let i = 0, len = this.tabs.length; i < len; i++) {
      const currentTab = this.tabs[i];

      const tabPanel = document.getElementById(
        currentTab.getAttribute("aria-controls")
      );

      currentTab.tabIndex = -1;
      currentTab.setAttribute("aria-selected", "false");
      this.tabPanels.push(tabPanel);

      currentTab.addEventListener("click", this.handleClick);
      currentTab.addEventListener("keydown", this.handleKeydown);
    }

    this.tabPanels[0].removeAttribute("tabIndex");
    this.tabPanels[0].classList.add("active");
    this.tabs[0].setAttribute("aria-selected", "true");
  }

  setActiveTab(targetTab) {
    for (let i = 0, len = this.tabs.length; i < len; i++) {
      const currentTab = this.tabs[i];

      if (currentTab === targetTab) {
        currentTab.setAttribute("aria-selected", "true");
        currentTab.removeAttribute("tabindex");
        this.tabPanels[i].classList.add("active");
      } else {
        currentTab.setAttribute("aria-selected", "false");
        currentTab.tabindex = -1;
        this.tabPanels[i].classList.remove("active");
      }
    }
  }

  moveFocusToTab(targetTab) {
    targetTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    if (currentTab !== this.tabs[0]) {
      const previousTabIndex = this.tabs.indexOf(currentTab) - 1;
      this.moveFocusToTab(this.tabs[previousTabIndex]);
    } else {
      this.moveFocusToTab(this.tabs[this.tabs.length - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    if (currentTab !== this.tabs[this.tabs.length - 1]) {
      const nextTabIndex = this.tabs.indexOf(currentTab) + 1;
      this.moveFocusToTab(nextTabIndex);
    } else {
      this.moveFocusToTab(this.tabs[0]);
    }
  }

  onPressArrowLeft(e) {
    e.stopPropagation();
    e.preventDefault();
    this.moveFocusToPreviousTab(e.currentTarget);
  }

  onPressArrowRight(e) {
    e.stopPropagation();
    e.preventDefault();
    this.moveFocusToNextTab(e.currentTarget);
  }

  onPressHome(e) {
    e.stopPropagation();
    e.preventDefault();
    this.moveFocusToTab(this.tabs[0]);
  }

  onPressEnd(e) {
    e.stopPropagation();
    e.preventDefault();
    this.moveFocusToTab(this.tabs[this.tabs.length - 1]);
  }

  handleKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.onPressArrowLeft(e);
        break;
      case "ArrowRight":
        this.onPressArrowRight(e);
        break;
      case "Home":
        this.onPressHome(e);
        break;
      case "End":
        this.onPressEnd(e);
        break;
      default:
        break;
    }
  }

  handleClick(e) {
    this.setActiveTab(e.currentTarget);
  }
}
