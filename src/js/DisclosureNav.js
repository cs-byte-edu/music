export class DisclosureNav {
  constructor(domNode) {
    this.container = domNode;
    this.openIndex = null;
    this.controlledNodes = [];
    this.topLevelTriggers = [
      ...this.container.querySelectorAll(
        "button[aria-expanded][aria-controls]"
      ),
    ];

    this.init();
  }

  init() {
    this.topLevelTriggers.forEach((trigger) => {
      if (
        trigger.tagName.toLowerCase() === "button" &&
        trigger.hasAttribute("aria-controls")
      ) {
        const menu = trigger.parentNode.parentNode.querySelector("ul");

        if (menu) {
          this.controlledNodes.push(menu);
          trigger.setAttribute("aria-expanded", "false");
          this.toggleMenu(menu, false);

          menu.addEventListener("keydown", this.onMenuKeyDown.bind(this));
          trigger.addEventListener("click", this.onButtonClick.bind(this));
          trigger.addEventListener("keydown", this.onButtonKeyDown.bind(this));
        }
      } else {
        this.controlledNodes.push(null);
        trigger.addEventListener("keydown", this.onLinkKeyDown.bind(this));
      }
    });
    this.container.addEventListener("focusout", this.onBlur.bind(this));
  }

  onBlur(event) {
    const menuContainsFocus = this.container.contains(event.relatedTarget);
    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(this.openIndex, false);
    }
  }

  onLinkKeyDown(event) {
    const targetLinkIndex = this.topLevelTriggers.indexOf(
      document.activeElement
    );
    this.controlFocusByKey(event, this.topLevelTriggers, targetLinkIndex);
  }

  controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.key) {
      case "ArrowUp":
      case "ArrowLeft":
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          var prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
      case "ArrowDown":
      case "ArrowRight":
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          var nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
          nodeList[nextIndex].focus();
        }
        break;
      case "Home":
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      case "End":
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
    }
  }

  toggleExpand(index, expanded) {
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }

    if (this.topLevelTriggers[index]) {
      this.openIndex = expanded ? index : null;
      this.topLevelTriggers[index].setAttribute("aria-expanded", expanded);
      this.toggleMenu(this.controlledNodes[index], expanded);
    }
  }

  onButtonClick(event) {
    const buttonIndex = this.topLevelTriggers.indexOf(event.target);
    const buttonExpanded =
      event.target.getAttribute("aria-expanded") === "true";
    this.toggleExpand(buttonIndex, !buttonExpanded);
  }

  onButtonKeyDown(event) {
    var targetButtonIndex = this.topLevelTriggers.indexOf(
      document.activeElement
    );

    if (event.key === "Escape") {
      this.toggleExpand(this.openIndex, false);
    } else if (
      this.openIndex === targetButtonIndex &&
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      this.controlledNodes[this.openIndex].querySelector("a").focus();
    } else {
      this.controlFocusByKey(event, this.topLevelTriggers, targetButtonIndex);
    }
  }

  toggleMenu(domNode, show) {
    if (domNode) {
      domNode.classList.toggle("is_active", show);
    }
  }

  onMenuKeyDown(event) {
    if (this.openIndex === null) {
      return;
    }

    const menuLinks = [
      ...this.controlledNodes[this.openIndex].querySelectorAll("a"),
    ];

    const currentIndex = menuLinks.indexOf(document.activeElement);

    if (event.key === "Escape") {
      this.topLevelTriggers[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
    } else {
      this.controlFocusByKey(event, menuLinks, currentIndex);
    }
  }
}
