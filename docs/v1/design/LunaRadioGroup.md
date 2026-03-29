# LunaRadioGroup Design Notes

`LunaRadioGroup` exists to turn manual radio composition into a durable grouped contract without introducing a broader form container.

## Intent

- keep grouped single-choice selection on top of the existing `LunaRadio` primitive
- centralize shared label and support text at the group level
- preserve native semantics instead of recreating radio behavior in custom elements
- stay themeable through the current radio and form token families

## V1 Decisions

- use an `items` array rather than freeform children so the first version stays compact and testable
- support controlled and uncontrolled selection because both are common library consumer needs
- keep layout to `vertical` or `horizontal` only
- leave per-item help and error handling to `LunaRadio`; the group owns only shared support text
- avoid adding validation orchestration, field registration, or form abstraction concerns in this issue

## Follow-Up Space

- custom item rendering if downstream needs exceed the V1 item shape
- tighter form integration patterns if the library later adds grouped field primitives more broadly
- richer responsive layout controls if a real consumer need appears
