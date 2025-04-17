/**
 *  Hightlight елемент каруселі, який найближче до центру контейнера.
 */
export function setupCarouselHighlighting(
  containerId,
  itemSelector,
  activeClassName = "active"
) {
  const container = document.getElementById(containerId);
  const itemsNodeList = container
    ? container.querySelectorAll(itemSelector)
    : null;

  if (!container) {
    console.warn(`Контейнер з ID "${containerId}" не знайдено.`);
    return;
  }
  if (!itemsNodeList || itemsNodeList.length === 0) {
    console.warn(
      `Елементи з селектором "${itemSelector}" не знайдено всередині "${containerId}".`
    );
    return;
  }

  const items = Array.from(itemsNodeList);

  let currentActiveItem = null;
  let rafId = null;

  function highlightCenterItem() {
    let closestItem = null;
    let minDistance = Infinity;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0) {
      return;
    }
    const containerCenter = containerRect.left + containerRect.width / 2;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();

      if (itemRect.width === 0) {
        return;
      }

      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem && closestItem !== currentActiveItem) {
      if (currentActiveItem) {
        currentActiveItem.classList.remove(activeClassName);
      }

      closestItem.classList.add(activeClassName);
      currentActiveItem = closestItem;
    } else if (!closestItem && currentActiveItem) {
      currentActiveItem.classList.remove(activeClassName);
      currentActiveItem = null;
    }

    rafId = null;
  }

  const handleScroll = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(highlightCenterItem);
  };

  container.addEventListener("scroll", handleScroll, { passive: true });

  requestAnimationFrame(highlightCenterItem);

  return function cleanup() {
    if (container) {
      container.removeEventListener("scroll", handleScroll);
    }
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    if (currentActiveItem) {
      currentActiveItem.classList.remove(activeClassName);
    }
    console.log(`Очищення для каруселі "${containerId}" виконано.`);
  };
}
