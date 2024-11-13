// src/directives/v-tooltip.ts
import type { Directive, DirectiveBinding } from 'vue';
import type { Timeout } from 'node:timers';

interface TooltipOptions {
  content: string;
  html: boolean;
  delay: number;
  trigger: string;
  show: boolean;
}

interface HTMLElement {
  _tooltip?: {
    tooltip: HTMLElement;
    showTooltip: () => void;
    hideTooltip: () => void;
    addEventListeners: () => void;
    removeEventListeners: () => void;
  };
}

const vTooltip: Directive<HTMLElement, TooltipOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-content tooltip-top';
    tooltip.innerHTML = binding.value.html ? binding.value.content : document.createTextNode(binding.value.content).textContent || '';
    el.classList.add('tooltip');
    el.appendChild(tooltip);

    let timeout: Timeout | null = null;

    const showTooltip = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        tooltip.classList.add('tooltip-visible');
      }, binding.value.delay || 0);
    };

    const hideTooltip = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        tooltip.classList.remove('tooltip-visible');
      }, binding.value.delay || 0);
    };

    const addEventListeners = () => {
      const triggers = binding.value.trigger.split(' ');

      triggers.forEach((event: string) => {
        if (event === 'hover') {
          el.addEventListener('mouseenter', showTooltip);
          el.addEventListener('mouseleave', hideTooltip);
        }
        if (event === 'click') {
          el.addEventListener('click', showTooltip);
          document.addEventListener('click', (e) => {
            if (!el.contains(e.target as Node)) hideTooltip();
          });
        }
        if (event === 'focus') {
          el.addEventListener('focus', showTooltip);
          el.addEventListener('blur', hideTooltip);
        }
      });
    };

    const removeEventListeners = () => {
      el.removeEventListener('mouseenter', showTooltip);
      el.removeEventListener('mouseleave', hideTooltip);
      el.removeEventListener('click', showTooltip);
      el.removeEventListener('focus', showTooltip);
      el.removeEventListener('blur', hideTooltip);
    };

    if (binding.value.show) {
      showTooltip();
    } else {
      hideTooltip();
    }

    addEventListeners();

    // Clean up event listeners when the directive is unmounted
    el._tooltip = { tooltip, showTooltip, hideTooltip, addEventListeners, removeEventListeners };
  },

  updated(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
    const tooltip = el.querySelector('.tooltip-content');
    if (tooltip) {
      tooltip.innerHTML = binding.value.html ? binding.value.content : document.createTextNode(binding.value.content).textContent || '';
    }
    if (binding.value.show) {
      el._tooltip?.showTooltip();
    } else {
      el._tooltip?.hideTooltip();
    }
  },

  unmounted(el: HTMLElement) {
    if (el._tooltip) {
      el._tooltip.removeEventListeners();
      el._tooltip.tooltip.remove();
    }
  },
};

export default vTooltip;
