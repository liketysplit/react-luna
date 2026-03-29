# LunaBreadcrumb

`LunaBreadcrumb` is the compact trail composite for showing the current location inside a deeper page hierarchy without taking ownership of routing.

It owns:
- breadcrumb landmark semantics
- ordered trail rendering
- current-page treatment
- optional middle collapse for long trails
- link, button, and static item presentation
- theme-aware spacing and state styling

It does not own:
- routing
- history state
- nested navigation menus
- overflow menus for hidden segments

## Props

- `items: Array<{ label: React.ReactNode; href?: string; onClick?: MouseEventHandler; current?: boolean; disabled?: boolean; ariaLabel?: string; target?: string; rel?: string; key?: React.Key }>`
- `ariaLabel?: string`
- `separator?: React.ReactNode`
- `maxItems?: number`
- `size?: "sm" | "md" | "lg"`
- `collapseLabel?: string`

Native `HTMLAttributes<HTMLElement>` continue to pass through to the root `nav`.

## Contract

- `LunaBreadcrumb` renders `nav > ol` semantics and defaults the navigation label to `"Breadcrumb"`
- `items` is required and an empty list renders nothing
- the current page is the first item marked with `current`, otherwise the last item in the list
- the current item renders as static text with `aria-current="page"` even when `href` or `onClick` is provided
- non-current items render as links when `href` is provided, buttons when only `onClick` is provided, and text otherwise
- `disabled` prevents interaction and renders the item as muted text
- `maxItems` collapses the middle of long trails around the current page; values below `3` do not collapse
- `separator` is decorative and hidden from assistive technology
- `className` and `style` pass through to the root shell

## Theme Integration

`LunaBreadcrumb` consumes the theme system for:
- radius
- size-based gap, separator gap, font size, minimum height, and item padding
- link, current, muted, and separator colors
- hover and focus treatments

Downstream consumers can override the breadcrumb feel without changing the list semantics or item contract.
