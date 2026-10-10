'use strict';
// Enhance the native select while keeping it as the single source of its value.
function createDropdown(select, config) {
  const holder = select.parentElement;
  holder.classList.add('dropdown', 'dropdown-enhanced');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'dropdown-trigger';
  trigger.id = `${select.id}Trigger`;
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', `${select.id}Menu`);
  const menu = document.createElement('div');
  menu.id = `${select.id}Menu`;
  menu.className = 'dropdown-menu';
  menu.setAttribute('role', 'menu');
  menu.hidden = true;
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');
  holder.append(trigger, menu);
  const options = () => [...menu.querySelectorAll('[role="menuitemradio"]')];
  function sync() {
    const focusedValue = menu.contains(document.activeElement) ? document.activeElement.closest('[data-value]')?.dataset.value : null;
    const label = config.label();
    const selected = select.selectedOptions[0];
    trigger.setAttribute('aria-label', `${label}：${selected.textContent}`);
    menu.setAttribute('aria-label', label);
    trigger.innerHTML = `<span class="dropdown-trigger-icon">${icon(config.icon(select.value))}</span><span class="dropdown-value">${escapeHTML(selected.textContent)}</span><span class="dropdown-chevron">${icon('chevron')}</span>`;
    menu.innerHTML = `<div class="dropdown-caption" role="presentation">${escapeHTML(label)}</div>` + [...select.options].map(option => {
      const description = config.description?.(option.value);
      return `<button type="button" class="dropdown-option" role="menuitemradio" tabindex="-1" aria-checked="${option.selected}" data-value="${option.value}"><span class="dropdown-option-icon">${icon(config.icon(option.value))}</span><span class="dropdown-option-copy"><span>${escapeHTML(option.textContent)}</span>${description ? `<small>${escapeHTML(description)}</small>` : ''}</span><span class="dropdown-check">${option.selected ? icon('check') : ''}</span></button>`;
    }).join('');
    if (!menu.hidden && focusedValue) options().find(option => option.dataset.value === focusedValue)?.focus();
  }
  function close(restoreFocus = false) {
    if (menu.hidden) return;
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }
  function open(position = 'selected') {
    document.dispatchEvent(new CustomEvent('dropdown:open', { detail: holder }));
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    const entries = options();
    const index = position === 'last' ? entries.length - 1 : position === 'first' ? 0 : Math.max(0, entries.findIndex(option => option.getAttribute('aria-checked') === 'true'));
    entries[index]?.focus();
  }
  trigger.addEventListener('click', () => menu.hidden ? open() : close(true));
  trigger.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      open(event.key === 'ArrowUp' || event.key === 'End' ? 'last' : 'first');
    }
  });
  menu.addEventListener('click', event => {
    const option = event.target.closest('[role="menuitemradio"]');
    if (!option) return;
    select.value = option.dataset.value;
    close(true);
    select.dispatchEvent(new Event('change', { bubbles: true }));
    sync();
  });
  menu.addEventListener('keydown', event => {
    const entries = options();
    const current = entries.indexOf(document.activeElement);
    let index;
    if (event.key === 'ArrowDown') index = (current + 1) % entries.length;
    if (event.key === 'ArrowUp') index = (current - 1 + entries.length) % entries.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = entries.length - 1;
    if (index !== undefined) { event.preventDefault(); entries[index].focus(); }
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); }
    if (event.key === 'Tab') close(true);
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== ' ') {
      const following = [...entries.slice(current + 1), ...entries.slice(0, current + 1)];
      const match = following.find(option => option.querySelector('.dropdown-option-copy').textContent.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (match) { event.preventDefault(); match.focus(); }
    }
  });
  document.addEventListener('pointerdown', event => { if (!holder.contains(event.target)) close(); });
  document.addEventListener('dropdown:open', event => { if (event.detail !== holder) close(); });
  holder.addEventListener('focusout', event => { if (!holder.contains(event.relatedTarget)) close(); });
  sync();
  return { sync, close };
}
