# fiftyyears — Component Inventory

Reference for an AI agent. Every entry is read from source (`src/components/*.tsx`, `src/theme/*`). Props listed are the distinctive/controlled ones — plain HTML passthrough (`className`, `style`, `id`, `onClick`, …) is omitted and always available.

## Setup

```tsx
import { Button, Card } from "fiftyyears"
import "fiftyyears/styles.css" // once, at app root
```

- React 18+ (peer dep `react` / `react-dom` `>=18`).
- Import `fiftyyears/styles.css` **once** for the whole app. It carries the design tokens plus all component styles.
- All components are named exports from `"fiftyyears"`. The theme system (`ThemeProvider`, controls, `PRESETS`, …) and `cn` are exported from the same entry.
- Styling is token-driven CSS (`fy-*` classes reading CSS custom properties). Change a theme preset/density and the whole system re-skins.

### Providers at a glance

Most components are self-contained. These need a wrapper:

| Need | Wrap with |
| --- | --- |
| Toasts | `<ToastProvider>` around app, `<Toaster />` rendered once, `useToast()` to enqueue |
| Tooltips | `<TooltipProvider>` around the app/subtree |
| Theming + theme controls | `<ThemeProvider>` around app; controls read its context |

Context-scoped components (throw if a sub-part is used outside its own root, but need **no** app-level provider): Accordion, Collapsible, Command, ContextMenu, DropdownMenu, HoverCard, Popover, RadioGroup, ToggleGroup, Tree. Radix-based roots (Dialog, AlertDialog, Sheet, Select, Tabs, Switch) act as their own context.

---

# Layout

### Box
`import { Box } from "fiftyyears"`
Most primitive layout element — a `<div>` with optional uniform padding.
Props: `padding?` number (px).
```tsx
<Box padding={16}>content</Box>
```

### Flex
`import { Flex } from "fiftyyears"`
General flexbox container; axis props apply inline.
Props: `direction?` "row" | "row-reverse" | "column" | "column-reverse" (default "row"), `align?` "start" | "center" | "end" | "stretch" | "baseline", `justify?` "start" | "center" | "end" | "between" | "around" | "evenly", `wrap?` "nowrap" | "wrap" | "wrap-reverse", `gap?` number (px).
```tsx
<Flex direction="column" align="center" gap={8}>…</Flex>
```

### Grid
`import { Grid } from "fiftyyears"`
CSS-grid container of `cols` equal-fraction columns.
Props: `cols?` number (default 1), `gap?` number (px).
```tsx
<Grid cols={3} gap={16}>…</Grid>
```

### Stack / HStack
`import { Stack, HStack } from "fiftyyears"`
`Stack` is a vertical flex column; `HStack` the horizontal counterpart.
Props: `gap?` number (px), `align?` "start" | "center" | "end" | "stretch" | "baseline", `justify?` "start" | "center" | "end" | "between" | "around" | "evenly".
(Sub-exports: Stack, HStack.)
```tsx
<Stack gap={8}><A/><B/></Stack>
<HStack gap={12} justify="between">…</HStack>
```

### Container
`import { Container } from "fiftyyears"`
Centered wrapper capping content width with responsive side padding.
Props: `maxWidth?` "sm" | "md" | "lg" | "xl" (default "lg"). (cva)
```tsx
<Container maxWidth="md">…</Container>
```

### Spacer
`import { Spacer } from "fiftyyears"`
Flex filler — grows to push siblings apart when unsized, or a fixed non-shrinking gap when sized. `aria-hidden`.
Props: `size?` number (px; omit to flex-grow).
```tsx
<HStack><Logo /><Spacer /><Menu /></HStack>
```

### Separator
`import { Separator } from "fiftyyears"`
Thin rule dividing content.
Props: `orientation?` "horizontal" | "vertical" (default "horizontal"), `decorative?` boolean (default true → hidden from AT; false → role="separator").
```tsx
<Separator />
<Separator orientation="vertical" decorative={false} />
```

### ScrollArea
`import { ScrollArea } from "fiftyyears"`
Scrollable viewport with thin theme-aware scrollbars. Constrain height/width via `style`/parent for scrolling to engage.
Props: `axis?` "vertical" | "horizontal" | "both" (default "vertical").
```tsx
<ScrollArea axis="both" style={{ maxHeight: 300 }}>…</ScrollArea>
```

### Card
`import { Card } from "fiftyyears"`
Bordered, elevated surface for grouping content.
Props: none distinctive; compose the parts.
(Sub-exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.)
```tsx
<Card><CardHeader><CardTitle>Title</CardTitle><CardDescription>Sub</CardDescription></CardHeader>
  <CardContent>Body</CardContent><CardFooter>Actions</CardFooter></Card>
```

---

# Forms

### Button
`import { Button } from "fiftyyears"`
Standard button; supports `asChild` slotting.
Props: `variant?` "primary" | "secondary" | "ghost" | "outline" | "danger" (default "primary"), `size?` "sm" | "default" | "lg" | "icon" (default "default"), `asChild?` boolean. (cva; `buttonVariants` exported.)
```tsx
<Button variant="danger" size="lg" onClick={go}>Delete</Button>
```

### Input
`import { Input } from "fiftyyears"`
Styled `<input>`; `type` defaults to "text".
Props: standard input attributes.
```tsx
<Input type="email" placeholder="you@example.com" />
```

### Textarea
`import { Textarea } from "fiftyyears"`
Styled multi-line text input.
Props: standard textarea attributes.
```tsx
<Textarea rows={4} value={v} onChange={onChange} />
```

### Label
`import { Label } from "fiftyyears"`
Thin wrapper over `@radix-ui/react-label`. Supports `htmlFor`.
```tsx
<Label htmlFor="name">Name</Label>
```

### Checkbox
`import { Checkbox } from "fiftyyears"`
Accessible checkbox (`<button role="checkbox">`, Space toggles); controlled or uncontrolled.
Props: `checked?` boolean, `defaultChecked?` boolean, `onCheckedChange?` (checked: boolean) => void.
```tsx
<Checkbox checked={on} onCheckedChange={setOn} />
```

### Switch
`import { Switch } from "fiftyyears"`
Two-state toggle built on `@radix-ui/react-switch`; renders a real checkbox for forms.
Props: `checked?`, `defaultChecked?`, `onCheckedChange?` (checked) => void, `disabled?`, `name?`, `value?`.
```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### RadioGroup
`import { RadioGroup, RadioGroupItem } from "fiftyyears"`
Accessible single-select group with roving-tabindex arrow navigation.
Props: `RadioGroup` — `value?` string, `defaultValue?` string, `onValueChange?` (value) => void, `name?`, `disabled?`. `RadioGroupItem` — `value` string (required).
(Sub-exports: RadioGroup, RadioGroupItem.) `RadioGroupItem` must be inside `<RadioGroup>`.
```tsx
<RadioGroup defaultValue="a" onValueChange={setV}>
  <RadioGroupItem value="a" /><RadioGroupItem value="b" /></RadioGroup>
```

### Slider
`import { Slider } from "fiftyyears"`
Accessible single-value slider (pointer + keyboard: arrows step, PageUp/Down ×10, Home/End jump). No Radix.
Props: `value?` number, `defaultValue?` number, `min?` (0), `max?` (100), `step?` (1), `disabled?`, `onValueChange?` (value: number) => void (continuous).
```tsx
<Slider min={0} max={10} defaultValue={5} onValueChange={setVol} />
```

### SegmentedControl
`import { SegmentedControl } from "fiftyyears"`
iOS-style single-select with a sliding pill; ARIA radiogroup, arrow navigation.
Props: `options` `{ label: ReactNode; value: string; disabled? }[]`, `value?`, `defaultValue?`, `onValueChange?` (value) => void, `disabled?`.
```tsx
<SegmentedControl options={[{label:"Day",value:"day"},{label:"Week",value:"week"}]} defaultValue="day" onValueChange={setView} />
```

### ToggleGroup
`import { ToggleGroup, ToggleGroupItem } from "fiftyyears"`
Group of toggle buttons, single- or multi-select (plain state + `aria-pressed`).
Props: `type` "single" | "multiple" (discriminated union). single: `value?` string / `onValueChange?` (string). multiple: `value?` string[] / `onValueChange?` (string[]). plus `defaultValue?`, `disabled?`. `ToggleGroupItem` — `value` string (required).
(Sub-exports: ToggleGroup, ToggleGroupItem.) Items must be inside `<ToggleGroup>`.
```tsx
<ToggleGroup type="single" defaultValue="grid"><ToggleGroupItem value="grid">Grid</ToggleGroupItem></ToggleGroup>
```

### Select
`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "fiftyyears"`
Listbox for one value, built on `@radix-ui/react-select` (keyboard, typeahead, collision handling). Auto-portaled.
Props: Radix passthrough — `Select` takes `value`/`defaultValue`/`onValueChange`; `SelectContent` adds `position?` "popper" | "item-aligned" (default "popper").
(Sub-exports: Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator.)
```tsx
<Select onValueChange={setV}><SelectTrigger><SelectValue placeholder="Pick" /></SelectTrigger>
  <SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
```

### Combobox
`import { Combobox } from "fiftyyears"`
Headless searchable single-select with keyboard nav and outside-click-to-close (ARIA combobox/listbox).
Props: `options` `ComboboxOption[]` (`{ label: string; value: string; disabled? }`), `value?` string, `onValueChange?` (value) => void, `placeholder?` (default "Search…"), `emptyMessage?` (default "No results."), `disabled?`, `name?`. (Type: ComboboxOption.)
```tsx
<Combobox options={opts} value={v} onValueChange={setV} />
```

### TagInput
`import { TagInput } from "fiftyyears"`
Controlled multi-value chip input: Enter/comma commits, Backspace on empty removes last, each chip has ×.
Props: `value` string[] (required), `onChange` (value: string[]) => void (required), `dedupe?` boolean (default true), `max?` number, `disabled?`.
```tsx
<TagInput value={tags} onChange={setTags} max={5} placeholder="Add tag…" />
```

### DatePicker
`import { DatePicker } from "fiftyyears"`
Input-like trigger showing a formatted date + icon; opens `Calendar` in a dropdown (closes on outside click/Escape).
Props: `value?` Date | null, `onChange?` (date: Date) => void, `placeholder?` (default "Pick a date"), `formatDate?` (date: Date) => string, `disabled?`.
```tsx
<DatePicker value={date} onChange={setDate} />
```

### Calendar
`import { Calendar } from "fiftyyears"`
Self-contained month grid with prev/next navigation; highlights selected day and today. Pure `Date` math.
Props: `value?` Date | null, `onChange?` (date: Date) => void.
```tsx
<Calendar value={date} onChange={setDate} />
```

### FileUpload
`import { FileUpload } from "fiftyyears"`
Dashed drop zone; highlights on drag-over, click opens file browser, lists selected files with size + remove. Selection state internal.
Props: `onFiles?` (files: File[]) => void, `multiple?` boolean (default true), `accept?` string, `disabled?`.
```tsx
<FileUpload accept="image/*" onFiles={setFiles} />
```

### Field
`import { Field, FieldLabel, FieldHint, FieldError } from "fiftyyears"`
Vertical form row grouping a control with its label, hint, and error for consistent spacing. `FieldError` renders `null` when empty and applies `role="alert"`.
Props: HTML passthrough; `FieldLabel` wraps `Label`.
(Sub-exports: Field, FieldLabel, FieldHint, FieldError.)
```tsx
<Field><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" /><FieldError>{err}</FieldError></Field>
```

### Form
`import { Form, FormRow, FormLabel, FormHint, FormControl } from "fiftyyears"`
Library-free form primitives; `FormControl` clones its single child to inject `aria-invalid`/`aria-describedby` and render an error.
Props: `FormControl` — `error?` string, `controlId?` string.
(Sub-exports: Form, FormRow, FormLabel, FormHint, FormControl.)
```tsx
<FormRow><FormLabel htmlFor="email">Email</FormLabel>
  <FormControl error={err} controlId="email"><Input id="email" /></FormControl></FormRow>
```

---

# Overlays

### Dialog
`import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "fiftyyears"`
Modal surface on `@radix-ui/react-dialog`; traps focus, dims page, returns focus on close. `DialogContent` renders its own portal, overlay, and X close button.
Props: Radix passthrough — `Dialog` takes `open`/`onOpenChange`/`defaultOpen`.
(Sub-exports: Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription.)
```tsx
<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogTitle>Hi</DialogTitle></DialogContent></Dialog>
```

### AlertDialog
`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "fiftyyears"`
Confirmation modal on `@radix-ui/react-dialog`; `role="alertdialog"`, no visible close, paired Action/Cancel. Action/Cancel are Radix `Close` — attach `onClick`; either dismisses.
Props: Radix passthrough — root takes `open`/`onOpenChange`/`defaultOpen`.
(Sub-exports: AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel.)
```tsx
<AlertDialog><AlertDialogTrigger>Delete</AlertDialogTrigger><AlertDialogContent>
  <AlertDialogTitle>Sure?</AlertDialogTitle><AlertDialogFooter>
  <AlertDialogCancel>No</AlertDialogCancel><AlertDialogAction onClick={del}>Yes</AlertDialogAction>
  </AlertDialogFooter></AlertDialogContent></AlertDialog>
```

### Sheet
`import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "fiftyyears"`
Side drawer on `@radix-ui/react-dialog`; slides in from an edge. Built-in X close button.
Props: `SheetContent` — `side?` "right" | "left" | "top" | "bottom" (default "right", cva). Root/Trigger/Close are Radix passthrough.
(Sub-exports: Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription; `sheetVariants`.)
```tsx
<Sheet><SheetTrigger>Open</SheetTrigger><SheetContent side="left"><SheetTitle>Menu</SheetTitle></SheetContent></Sheet>
```

### Popover
`import { Popover, PopoverTrigger, PopoverContent } from "fiftyyears"`
Headless floating panel anchored beneath a trigger; closes on outside click / Escape.
Props: `Popover` — `open?`/`defaultOpen?`/`onOpenChange?`. `PopoverTrigger` — `asChild?`. `PopoverContent` — `align?` "start" | "center" | "end" (default "center"), `sideOffset?` number (default 6).
(Sub-exports: Popover, PopoverTrigger, PopoverContent.) Trigger/Content must be inside `<Popover>`.
```tsx
<Popover><PopoverTrigger>Open</PopoverTrigger><PopoverContent align="start">Panel</PopoverContent></Popover>
```

### HoverCard
`import { HoverCard, HoverCardTrigger, HoverCardContent } from "fiftyyears"`
Headless rich floating card opening on hover/focus after a delay.
Props: `HoverCard` — `openDelay?` (300), `closeDelay?` (150), `open?`/`defaultOpen?`/`onOpenChange?`. `HoverCardTrigger` — `asChild?`. `HoverCardContent` — `align?` "start" | "center" | "end" (default "center"), `sideOffset?` (8).
(Sub-exports: HoverCard, HoverCardTrigger, HoverCardContent.) Trigger/Content must be inside `<HoverCard>`.
```tsx
<HoverCard><HoverCardTrigger asChild><a>@user</a></HoverCardTrigger><HoverCardContent>Profile</HoverCardContent></HoverCard>
```

### Tooltip
`import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "fiftyyears"`
Small floating label on `@radix-ui/react-tooltip`; portaled with an arrow.
Props: `TooltipContent` — `sideOffset?` (6), `side?`, `align?`. Radix passthrough otherwise.
(Sub-exports: TooltipProvider, Tooltip, TooltipTrigger, TooltipContent.)
**Provider:** wrap the app/subtree in `<TooltipProvider>`.
```tsx
<TooltipProvider><Tooltip><TooltipTrigger asChild><button>?</button></TooltipTrigger>
  <TooltipContent>Help</TooltipContent></Tooltip></TooltipProvider>
```

### DropdownMenu
`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "fiftyyears"`
Headless button-triggered action menu; roving focus, closes on outside click/Escape/select.
Props: `DropdownMenu` — `open?`/`defaultOpen?`/`onOpenChange?`. `DropdownMenuTrigger` — `asChild?`. `DropdownMenuContent` — `align?` "start" | "center" | "end" (default "start"), `sideOffset?` (6). `DropdownMenuItem` — `disabled?`, `variant?` "default" | "danger", `keepOpen?`.
(Sub-exports: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel.) Sub-parts must be inside `<DropdownMenu>`.
```tsx
<DropdownMenu><DropdownMenuTrigger>Menu</DropdownMenuTrigger>
  <DropdownMenuContent><DropdownMenuItem onClick={go}>Edit</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
```

### ContextMenu
`import { ContextMenu, ContextMenuContent, ContextMenuItem } from "fiftyyears"`
Headless right-click menu opening at the cursor; closes on outside click/Escape/select; arrow/Home/End nav.
Props: `ContextMenuItem` — `disabled?`, `variant?` "default" | "danger".
(Sub-exports: ContextMenu, ContextMenuContent, ContextMenuItem.) Sub-parts must be inside `<ContextMenu>`.
```tsx
<ContextMenu><ContextMenuContent><ContextMenuItem variant="danger" onClick={del}>Delete</ContextMenuItem></ContextMenuContent></ContextMenu>
```

### Command
`import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "fiftyyears"`
Headless filterable command palette; items register a filter value, arrows move highlight, Enter activates.
Props: `Command` — `filter?` (value, search) => boolean. `CommandInput` — `value?` / `onValueChange?` (string). `CommandItem` — `value?` string, `disabled?`, `onSelect?` () => void.
(Sub-exports: Command, CommandInput, CommandList, CommandItem, CommandEmpty.) Sub-parts must be inside `<Command>`.
```tsx
<Command><CommandInput /><CommandList>
  <CommandItem onSelect={run}>Open</CommandItem><CommandEmpty>None</CommandEmpty></CommandList></Command>
```

---

# Navigation

### Tabs
`import { Tabs, TabsList, TabsTrigger, TabsContent } from "fiftyyears"`
Layered sections showing one at a time, on `@radix-ui/react-tabs`; active trigger gets an accent underline.
Props: Radix passthrough — `Tabs` takes `value`/`defaultValue`/`onValueChange`/`orientation`; `TabsTrigger`/`TabsContent` take `value`.
(Sub-exports: Tabs, TabsList, TabsTrigger, TabsContent.)
```tsx
<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">A</TabsTrigger></TabsList>
  <TabsContent value="a">Panel A</TabsContent></Tabs>
```

### Breadcrumb
`import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "fiftyyears"`
Hierarchical navigation trail (`<nav>`); items joined by separators, `BreadcrumbPage` marks the current page.
Props: `BreadcrumbLink` — `asChild?`. `BreadcrumbSeparator` defaults to a `ChevronRight` icon.
(Sub-exports: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator.)
```tsx
<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Now</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
```

### Pagination
`import { Pagination } from "fiftyyears"`
Compact page navigator with Prev/Next plus numbered buttons, collapsing long ranges with ellipses.
Props: `page` number (1-based, required), `pageCount` number (required), `onPageChange` (page: number) => void (required), `siblingCount?` number (default 1).
```tsx
<Pagination page={page} pageCount={10} onPageChange={setPage} />
```

### Sidebar
`import { Sidebar, SidebarSection, SidebarItem } from "fiftyyears"`
Vertical navigation rail (`<aside>`) of titled sections of icon+label items.
Props: `SidebarSection` — `title?` ReactNode. `SidebarItem` — `active?` boolean, `icon?` ReactNode, `trailing?` ReactNode, `asChild?` boolean (render an `<a>` via Slot).
(Sub-exports: Sidebar, SidebarSection, SidebarItem.)
```tsx
<Sidebar><SidebarSection title="Main"><SidebarItem icon={<Home/>} active>Dashboard</SidebarItem></SidebarSection></Sidebar>
```

### Stepper
`import { Stepper } from "fiftyyears"`
Horizontal progress indicator for multi-step flows; numbered circles joined by connectors (done/current/todo). Renders `<ol>`.
Props: `steps` `Step[]` (`{ label: ReactNode; description? }`), `current` number (0-based active index). (Type: Step.)
```tsx
<Stepper current={1} steps={[{label:"Cart"},{label:"Pay",description:"Card"},{label:"Done"}]} />
```

---

# Feedback

### Alert
`import { Alert, AlertTitle, AlertDescription } from "fiftyyears"`
Static inline callout with left accent border and variant-tinted background.
Props: `variant?` "info" | "ok" | "warn" | "danger" (default "info"). (cva; `alertVariants` exported.)
(Sub-exports: Alert, AlertTitle, AlertDescription.)
```tsx
<Alert variant="warn"><AlertTitle>Heads up</AlertTitle><AlertDescription>Details.</AlertDescription></Alert>
```

### Banner
`import { Banner } from "fiftyyears"`
Full-width notice bar pinned above content, tinted semantic; optional trailing dismiss.
Props: `variant?` "info" | "ok" | "warn" | "danger" (default "info"), `onDismiss?` () => void (renders × when set), `dismissLabel?` (default "Dismiss"). (cva; `bannerVariants`.)
```tsx
<Banner variant="warn" onDismiss={close}>Maintenance tonight.</Banner>
```

### Toast
`import { ToastProvider, Toaster, useToast } from "fiftyyears"`
Self-contained notification system (no Radix). Toasts stack bottom-right, auto-dismiss ~4s, closeable; left accent border encodes variant.
API: `useToast()` → `{ toast, dismiss }`; `toast(options) => number` (id), `dismiss(id: number)`. `ToastOptions`: `title?`, `description?`, `variant?` "default" | "ok" | "danger", `duration?` number (default 4000; 0 disables auto-dismiss). (Types: ToastOptions, ToastVariant.)
**Provider:** wrap app in `<ToastProvider>`, render `<Toaster />` once, call `useToast()`.
```tsx
const { toast } = useToast()
toast({ title: "Saved", variant: "ok" })
```

### Progress
`import { Progress } from "fiftyyears"`
Determinate progress bar (`role="progressbar"`) with an accent-filled track.
Props: `value?` number (default 0, clamped 0–max), `max?` number (default 100).
```tsx
<Progress value={40} />
```

### Spinner
`import { Spinner } from "fiftyyears"`
Indeterminate rotating ring for pending states (`role="status"`).
Props: `size?` "sm" | "md" | "lg" (default "md"), `label?` string (default "Loading", sets aria-label). (cva; `spinnerVariants`.)
```tsx
<Spinner size="lg" label="Fetching" />
```

### Skeleton
`import { Skeleton } from "fiftyyears"`
Shimmering placeholder shown while content loads; size via `className`. `aria-hidden`.
Props: none distinctive.
```tsx
<Skeleton className="h-4 w-32" />
```

### EmptyState
`import { EmptyState } from "fiftyyears"`
Dashed-border centered "nothing here yet" container with optional icon/title/description; children are the action region.
Props: `title` ReactNode (required), `description?` ReactNode, `icon?` ReactNode.
```tsx
<EmptyState icon={<Inbox />} title="No items yet"><Button>Add</Button></EmptyState>
```

---

# Display

### Badge
`import { Badge } from "fiftyyears"`
Small inline status label (`<span>`).
Props: `variant?` "default" | "ok" | "warn" | "danger" | "muted" (default "default"). (cva; `badgeVariants`.)
```tsx
<Badge variant="ok">Active</Badge>
```

### Tag
`import { Tag } from "fiftyyears"`
Small neutral outlined label chip for categorization (vs Badge which signals status); optionally removable.
Props: `onRemove?` () => void (renders trailing ×), `removeLabel?` (default "Remove").
```tsx
<Tag onRemove={() => remove(id)}>Design</Tag>
```

### Avatar / AvatarGroup
`import { Avatar, AvatarGroup } from "fiftyyears"`
Circular user representation; renders `src` when it loads, else falls back to initials/placeholder. `AvatarGroup` overlaps children.
Props: `Avatar` — `src?`, `alt?`, `fallback?` string.
(Sub-exports: Avatar, AvatarGroup.)
```tsx
<AvatarGroup><Avatar src="/a.png" alt="Ann" fallback="AN" /><Avatar fallback="BO" /></AvatarGroup>
```

### StatusDot
`import { StatusDot } from "fiftyyears"`
Small filled circle in a semantic color for connection/trigger/action health; optionally pulses. Decorative by default — pass `aria-label` for standalone status.
Props: `variant?` "ok" | "warn" | "danger" | "off" (default "off"), `pulse?` boolean. (cva; `statusDotVariants`.)
```tsx
<StatusDot variant="ok" pulse aria-label="Online" />
```

### Stat
`import { Stat } from "fiftyyears"`
Dashboard metric tile: label, large value, optional colored delta and hint.
Props: `label` ReactNode (required), `value` ReactNode (required), `delta?` ReactNode, `deltaDirection?` "up" | "down" | "neutral" (default "neutral"), `hint?` ReactNode.
```tsx
<Stat label="Revenue" value="$12.4k" delta="+12%" deltaDirection="up" hint="vs last month" />
```

### Table
`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "fiftyyears"`
Semantic data table; root wraps `<table>` in a scroll container. Add `fy-num` class to a cell for tabular figures.
Props: HTML passthrough.
(Sub-exports: Table, TableHeader, TableBody, TableRow, TableHead, TableCell.)
```tsx
<Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Ada</TableCell></TableRow></TableBody></Table>
```

### DataTable
`import { DataTable } from "fiftyyears"`
Generic client-side sortable/filterable/paginated table; owns search, sort, and pagination state internally.
Props: `columns` `DataTableColumn<T>[]` (`{ key: keyof T & string; header: ReactNode; sortable?; render?: (value, row) => ReactNode; numeric? }`), `data` T[], `pageSize?` number (default 10), `searchPlaceholder?` (default "Search…"). `T extends Record<string, unknown>`. (Type: DataTableColumn<T>.)
```tsx
<DataTable columns={cols} data={rows} pageSize={20} />
```

### Accordion
`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "fiftyyears"`
ARIA-driven stack of expandable sections; single/multiple open, keyboard nav.
Props: `Accordion` — `type?` "single" | "multiple" (default "single"), `value?`/`defaultValue?` string | string[], `onValueChange?` (value) => void, `collapsible?` boolean (default true). `AccordionItem` — `value` string (required).
(Sub-exports: Accordion, AccordionItem, AccordionTrigger, AccordionContent.) Sub-parts must be inside `<Accordion>`.
```tsx
<Accordion type="single" defaultValue="a"><AccordionItem value="a">
  <AccordionTrigger>Q</AccordionTrigger><AccordionContent>A</AccordionContent></AccordionItem></Accordion>
```

### Collapsible
`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "fiftyyears"`
Single headless open/close region; controlled or uncontrolled.
Props: `Collapsible` — `open?`, `defaultOpen?` (default false), `onOpenChange?` (open) => void.
(Sub-exports: Collapsible, CollapsibleTrigger, CollapsibleContent.) Sub-parts must be inside `<Collapsible>`.
```tsx
<Collapsible defaultOpen><CollapsibleTrigger>More</CollapsibleTrigger><CollapsibleContent>Details</CollapsibleContent></Collapsible>
```

### Tree
`import { Tree, TreeItem } from "fiftyyears"`
Headless nested expandable list; a chevron toggles children, each level indents via depth context. ARIA tree/treeitem/group.
Props: `TreeItem` — `label` ReactNode (required), `icon?`, `open?`/`defaultOpen?` (default false)/`onOpenChange?`, `selected?`. Children make the row expandable. Keyboard: ArrowRight/Left/Enter/Space.
(Sub-exports: Tree, TreeItem.)
```tsx
<Tree><TreeItem label="src" icon={<Folder />} defaultOpen><TreeItem label="index.ts" /></TreeItem></Tree>
```

### Timeline
`import { Timeline, TimelineItem } from "fiftyyears"`
Vertical list of events; each item renders a dot, a connector line, and content. Renders `<ol>`/`<li>`.
Props: `TimelineItem` — `dot?` ReactNode (custom node inside the dot).
(Sub-exports: Timeline, TimelineItem.)
```tsx
<Timeline><TimelineItem dot={<Check />}>Shipped</TimelineItem></Timeline>
```

### Carousel
`import { Carousel } from "fiftyyears"`
Dependency-free horizontal scroll-snap slider; prev/next by one slide, dots reflect/jump to active, native swipe stays in sync. Arrows/dots only render with >1 slide.
Props: `children` (each child = a slide), `showArrows?` boolean (default true), `showDots?` boolean (default true), `label?` (default "Carousel").
```tsx
<Carousel label="Photos"><img src="/1.jpg" /><img src="/2.jpg" /></Carousel>
```

### CodeBlock
`import { CodeBlock } from "fiftyyears"`
Monospace, muted, horizontally-scrollable `<pre>` with optional copy-to-clipboard button.
Props: `code?` string (or via children), `copyable?` boolean (default false), `copyLabel?` (default "Copy code").
```tsx
<CodeBlock copyable>{"npm install fiftyyears"}</CodeBlock>
```

### Kbd
`import { Kbd } from "fiftyyears"`
Key-cap styled `<kbd>` for a keyboard key or chord.
Props: none distinctive.
```tsx
<Kbd>⌘</Kbd><Kbd>Enter</Kbd>
```

### TypeSpecimen
`import { TypeSpecimen } from "fiftyyears"`
Live specimen of the system's type — families, size scale, weight ramp; reads theme tokens so it re-renders per theme.
Props: none distinctive.
```tsx
<TypeSpecimen />
```

---

# Automation domain

Components built for a WHEN→THEN automation-builder UI.

### Node
`import { Node, NodeConnector } from "fiftyyears"`
`Node` is a single bordered row in an automation flow (leading / children / trailing slots); `NodeConnector` is a decorative vertical line linking stacked Nodes.
Props: `Node` — `trailing?` ReactNode (right-edge content, e.g. menu/badge/switch).
(Sub-exports: Node, NodeConnector.)
```tsx
<Node trailing={<Switch />}>When a lead arrives</Node><NodeConnector />
```

### VariableChip
`import { VariableChip } from "fiftyyears"`
Renders an automation template token like `{{client_name}}` as a soft accent monospace pill, inline in trigger/action descriptions.
Props: `name` string (required; rendered wrapped in `{{ }}`).
```tsx
<VariableChip name="client_name" />
```

---

# Theme

`import { ThemeProvider, ModeControl, ThemeControl, DensityControl, useTheme, PRESETS, DENSITIES, applyPreset, applyDensity } from "fiftyyears"`

Headless three-axis theming: **color mode** (system/light/dark), **theme preset** (structural, not just recolor), **density** (compact→spacious). State persists to `localStorage` and is applied to `<html>` (including first load).

### ThemeProvider
Owns the three axes, persists them, applies them to `<html>`, exposes them via context. Wrap the app **once**.
Props: `children`, `defaultPreset?` string (default first preset id), `defaultDensity?` string (default "cozy"), `defaultMode?` "system" | "light" | "dark" (default "system"). (Types: ThemeMode, ThemeProviderProps.)
```tsx
<ThemeProvider><App /></ThemeProvider>
```

### useTheme
Access theme state. Throws outside `<ThemeProvider>`.
Returns: `{ mode, setMode, presetId, setPresetId, densityId, setDensityId, presets, densities }`.

### ModeControl
Single button cycling system → light → dark. Reads context.
Props: `variant?` "icon" | "labeled" (default "icon"). (Type: ModeControlProps.)
```tsx
<ModeControl variant="labeled" />
```

### ThemeControl
Dropdown of theme presets. Reads context.
Props: `showSwatch?` boolean (default true). (Type: ThemeControlProps.)
```tsx
<ThemeControl />
```

### DensityControl
Dropdown of density options (scales spacing/controls across every theme). Reads context.
Props: standard select attributes. (Type: DensityControlProps.)
```tsx
<DensityControl />
```

### PRESETS / DENSITIES / applyPreset / applyDensity
Theme primitives (used internally by `ThemeProvider`; exported for advanced use).
- `PRESETS: ThemePreset[]` — ids: `default` (Foundation), `editorial`, `signal` (Signal Desk), `brutal` (Brutalist), `solarized`, `candy`, `kiosk`. Each `{ id, name, blurb, swatch, shared, light, dark }` and may override any token (type, density, radius, borders, elevation, color) so switching looks like switching products.
- `DENSITIES: DensityPreset[]` — `compact` (0.82), `cozy` (1), `comfortable` (1.15), `spacious` (1.32). Each `{ id, name, value }`.
- `applyPreset(preset: ThemePreset, isDark: boolean): void` — clears the preset var universe, then applies `shared` + light/dark variant to `<html>`.
- `applyDensity(density: DensityPreset): void` — sets `--fy-user-density` on `<html>`.
- Types: ThemePreset, DensityPreset, ThemeVars.

Density is a product of two multipliers: `--fy-theme-density` (a theme's intrinsic scale, e.g. Kiosk is big) × `--fy-user-density` (the user's Compact→Spacious choice), so every theme still responds to the density control.

---

# Design tokens

Single source of truth in `src/styles/tokens.css`. Every component reads these; nothing hardcodes a color, size, weight, radius, or border. Values are HSL triplets (used as `hsl(var(--token))`) unless noted. Light is the default on `:root`; dark applies under `.dark` or the OS preference when no class is set.

- **Color** — surfaces/text: `--fy-bg`, `--fy-fg`, `--fy-card`, `--fy-card-fg`, `--fy-muted`, `--fy-muted-fg`, `--fy-border`, `--fy-input`. Accent: `--fy-primary`, `--fy-primary-fg`, `--fy-ring`. Status: `--fy-ok`/`-fg`, `--fy-warn`/`-fg`, `--fy-danger`/`-fg`.
- **Type** — families: `--fy-font-sans`, `--fy-font-mono`, `--fy-font-ui`, `--fy-font-heading`, `--fy-font-label`. Scale: `--fy-text-xs` … `--fy-text-2xl`. Weights: `--fy-weight-normal|medium|semibold|bold`, `--fy-weight-heading`. Tracking/leading: `--fy-tracking-tight|normal|wide|caps`, `--fy-leading-tight|normal`.
- **Density / spacing** — multipliers `--fy-theme-density`, `--fy-user-density`, product `--fy-density`. Spacing: `--fy-space-base`, `--fy-space-unit`, `--fy-space-1..8`. Controls: `--fy-control-h-sm|(default)|-lg`, `--fy-control-px`, `--fy-control-px-sm`, `--fy-pad-card`.
- **Radius** — `--fy-radius`, `--fy-radius-sm`, `--fy-radius-lg`, `--fy-radius-full`.
- **Border** — `--fy-border-width`, `--fy-border-width-strong`.
- **Elevation** — `--fy-shadow-sm`, `--fy-shadow`, `--fy-shadow-lg` (a flat theme sets these to `none`).
- **Status-dot** — `--fy-dot-size`, `--fy-dot-glow` (halo blur; 0 = flat ring).
- **Motion** — `--fy-ease`, `--fy-duration`.
