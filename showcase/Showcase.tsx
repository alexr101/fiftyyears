import * as React from "react"
import { PRESETS, applyPreset, DENSITIES, applyDensity } from "../src/theme/presets"
import {
  Zap,
  Plus,
  RefreshCw,
  Trash2,
  Sparkles,
  Home,
  Workflow,
  Plug,
  Settings,
  FileText,
  Folder,
  MoreHorizontal,
  Pencil,
  Copy,
  Send,
  CircleCheck,
  CircleX,
  Clock,
} from "lucide-react"

import {
  Button,
  Input,
  Textarea,
  Label,
  Field,
  FieldLabel,
  FieldHint,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Separator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ToastProvider,
  Toaster,
  useToast,
  StatusDot,
  VariableChip,
  TypeSpecimen,
  Node,
  NodeConnector,
  Kbd,
  EmptyState,
  // Layout
  Box,
  Stack,
  HStack,
  Flex,
  Grid,
  Container,
  Spacer,
  ScrollArea,
  // Form controls
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  SegmentedControl,
  TagInput,
  Combobox,
  Form,
  FormRow,
  FormLabel,
  FormHint,
  FormControl,
  // Overlays
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  // Navigation
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  Sidebar,
  SidebarSection,
  SidebarItem,
  Stepper,
  // Feedback
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  Progress,
  Skeleton,
  Spinner,
  Avatar,
  AvatarGroup,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Timeline,
  TimelineItem,
  Stat,
  CodeBlock,
  Tag,
  Tree,
  TreeItem,
  Carousel,
  // Data
  DataTable,
  type DataTableColumn,
  Calendar,
  DatePicker,
  FileUpload,
} from "../src/index"

type ThemeMode = "system" | "light" | "dark"
const THEME_KEY = "fy-theme"
const PRESET_KEY = "fy-preset"
const DENSITY_KEY = "fy-density-id"
const THEME_ORDER: ThemeMode[] = ["system", "light", "dark"]

/** Toolbar button that raises a real toast so the toast system can be reviewed. */
function PublishToastButton() {
  const { toast } = useToast()
  return (
    <Button
      variant="primary"
      onClick={() =>
        toast({
          title: "Published",
          description: "Payment failed → 3 actions is live",
          variant: "ok",
        })
      }
    >
      Publish automation
    </Button>
  )
}

/* ------------------------------------------------------------------ *
 * Layout section
 * ------------------------------------------------------------------ */

/** A visible tile used to make layout primitives (Box/Stack/Flex/Grid) legible. */
function Tile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      padding={10}
      style={{
        background: "var(--fy-surface-2, rgba(127,127,127,0.12))",
        border: "1px solid var(--fy-border, rgba(127,127,127,0.28))",
        borderRadius: 8,
        fontSize: 13,
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  )
}

function LayoutSection() {
  return (
    <section className="sc-sect">
      <h2>Layout</h2>

      <h3 className="sc-sub">Box &amp; Stack / HStack</h3>
      <div className="sc-grid2">
        <Stack gap={8}>
          <Tile>Stack — item 1</Tile>
          <Tile>Stack — item 2</Tile>
          <Tile>Stack — item 3</Tile>
        </Stack>
        <HStack gap={8} align="stretch">
          <Tile>Slack</Tile>
          <Tile>Sheets</Tile>
          <Tile>Todoist</Tile>
        </HStack>
      </div>

      <h3 className="sc-sub">Flex</h3>
      <Flex gap={8} justify="between" align="center" wrap="wrap">
        <Tile>WHEN payment.failed</Tile>
        <Spacer />
        <Tile>THEN notify #pm-failed</Tile>
      </Flex>

      <h3 className="sc-sub">Grid</h3>
      <Grid cols={4} gap={8}>
        <Tile>Runs</Tile>
        <Tile>Errors</Tile>
        <Tile>Clients</Tile>
        <Tile>Actions</Tile>
      </Grid>

      <h3 className="sc-sub">Container</h3>
      <Container
        maxWidth="sm"
        style={{
          background: "var(--fy-surface-2, rgba(127,127,127,0.1))",
          border: "1px dashed var(--fy-border, rgba(127,127,127,0.3))",
          borderRadius: 8,
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: 13,
        }}
      >
        Container (maxWidth=&quot;sm&quot;) — caps content width and centers it.
      </Container>

      <h3 className="sc-sub">Spacer</h3>
      <Flex
        gap={0}
        align="center"
        style={{
          border: "1px solid var(--fy-border, rgba(127,127,127,0.28))",
          borderRadius: 8,
          padding: 10,
        }}
      >
        <span style={{ fontSize: 13 }}>Automation name</span>
        <Spacer />
        <Badge variant="ok">live</Badge>
        <Spacer size={12} />
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </Flex>

      <h3 className="sc-sub">ScrollArea</h3>
      <ScrollArea style={{ maxHeight: 120 }}>
        <Stack gap={6}>
          {Array.from({ length: 12 }, (_, i) => (
            <Tile key={i}>Run #{2035246 - i} — payment.failed → Slack</Tile>
          ))}
        </Stack>
      </ScrollArea>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Form controls section
 * ------------------------------------------------------------------ */

const TRIGGER_OPTIONS = [
  { label: "payment.failed", value: "payment.failed" },
  { label: "invoice.paid", value: "invoice.paid" },
  { label: "client.created", value: "client.created" },
  { label: "quote.approved", value: "quote.approved" },
  { label: "job.completed", value: "job.completed" },
]

function FormControlsSection() {
  const [notify, setNotify] = React.useState(true)
  const [retries, setRetries] = React.useState(false)
  const [action, setAction] = React.useState("slack")
  const [threshold, setThreshold] = React.useState(60)
  const [channels, setChannels] = React.useState<string[]>(["slack", "sheets"])
  const [view, setView] = React.useState("published")
  const [tags, setTags] = React.useState<string[]>(["urgent", "payments"])
  const [trigger, setTrigger] = React.useState("payment.failed")

  return (
    <section className="sc-sect">
      <h2>Form controls</h2>

      <h3 className="sc-sub">Checkbox &amp; RadioGroup</h3>
      <div className="sc-grid2">
        <Stack gap={10}>
          <div className="sc-row">
            <Checkbox
              id="notify"
              checked={notify}
              onCheckedChange={setNotify}
            />
            <Label htmlFor="notify">Notify Slack on failure</Label>
          </div>
          <div className="sc-row">
            <Checkbox
              id="retries"
              checked={retries}
              onCheckedChange={setRetries}
            />
            <Label htmlFor="retries">Retry failed actions</Label>
          </div>
        </Stack>
        <RadioGroup value={action} onValueChange={setAction}>
          <Stack gap={10}>
            <div className="sc-row">
              <RadioGroupItem id="act-slack" value="slack" />
              <Label htmlFor="act-slack">Post to Slack</Label>
            </div>
            <div className="sc-row">
              <RadioGroupItem id="act-sheets" value="sheets" />
              <Label htmlFor="act-sheets">Append to Google Sheets</Label>
            </div>
            <div className="sc-row">
              <RadioGroupItem id="act-todoist" value="todoist" />
              <Label htmlFor="act-todoist">Create Todoist task</Label>
            </div>
          </Stack>
        </RadioGroup>
      </div>

      <Separator style={{ margin: "16px 0" }} />

      <h3 className="sc-sub">Slider</h3>
      <Stack gap={8} style={{ maxWidth: 360 }}>
        <div className="sc-row" style={{ justifyContent: "space-between" }}>
          <Label>Alert threshold</Label>
          <span className="fy-num">{threshold}%</span>
        </div>
        <Slider value={threshold} onValueChange={setThreshold} min={0} max={100} />
      </Stack>

      <Separator style={{ margin: "16px 0" }} />

      <h3 className="sc-sub">ToggleGroup &amp; SegmentedControl</h3>
      <div className="sc-col">
        <ToggleGroup
          type="multiple"
          value={channels}
          onValueChange={setChannels}
        >
          <ToggleGroupItem value="slack">Slack</ToggleGroupItem>
          <ToggleGroupItem value="sheets">Sheets</ToggleGroupItem>
          <ToggleGroupItem value="todoist">Todoist</ToggleGroupItem>
          <ToggleGroupItem value="email">Email</ToggleGroupItem>
        </ToggleGroup>
        <div style={{ maxWidth: 320 }}>
          <SegmentedControl
            value={view}
            onValueChange={setView}
            options={[
              { label: "Published", value: "published" },
              { label: "Drafts", value: "drafts" },
              { label: "Logs", value: "logs" },
            ]}
          />
        </div>
      </div>

      <Separator style={{ margin: "16px 0" }} />

      <h3 className="sc-sub">TagInput &amp; Combobox</h3>
      <div className="sc-grid2">
        <Field>
          <FieldLabel htmlFor="tags">Labels</FieldLabel>
          <TagInput
            id="tags"
            value={tags}
            onChange={setTags}
            placeholder="Add a label…"
          />
          <FieldHint>Press Enter or comma to add.</FieldHint>
        </Field>
        <Field>
          <FieldLabel htmlFor="trigger-combo">Trigger event</FieldLabel>
          <Combobox
            id="trigger-combo"
            options={TRIGGER_OPTIONS}
            value={trigger}
            onValueChange={setTrigger}
            placeholder="Search triggers…"
          />
          <FieldHint>Type to filter Jobber events.</FieldHint>
        </Field>
      </div>

      <Separator style={{ margin: "16px 0" }} />

      <h3 className="sc-sub">Form / FormRow / FormControl</h3>
      <Form
        style={{ maxWidth: 420 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormRow>
          <FormLabel htmlFor="form-channel">Slack channel</FormLabel>
          <FormControl controlId="form-channel">
            <Input id="form-channel" defaultValue="#pm-failed" />
          </FormControl>
          <FormHint>The channel the alert is posted to.</FormHint>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="form-webhook">Webhook URL</FormLabel>
          <FormControl
            controlId="form-webhook"
            error="Must be a valid https:// URL."
          >
            <Input id="form-webhook" defaultValue="htp://hooks.slack" />
          </FormControl>
        </FormRow>
      </Form>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Overlays section
 * ------------------------------------------------------------------ */

function OverlaysSection() {
  const [command, setCommand] = React.useState("")

  return (
    <section className="sc-sect">
      <h2>Overlays</h2>

      <div className="sc-row" style={{ flexWrap: "wrap" }}>
        {/* Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Stack gap={8} style={{ minWidth: 200 }}>
              <strong style={{ fontSize: 13 }}>Run details</strong>
              <div style={{ fontSize: 13 }}>
                payment.failed for{" "}
                <VariableChip name="client_name" /> — retried once, then
                delivered to #pm-failed.
              </div>
            </Stack>
          </PopoverContent>
        </Popover>

        {/* DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              Actions
              <MoreHorizontal size={14} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Automation</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pencil size={14} aria-hidden="true" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy size={14} aria-hidden="true" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger">
              <Trash2 size={14} aria-hidden="true" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* HoverCard */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost">Kim Esperat</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <Stack gap={6} style={{ minWidth: 220 }}>
              <div className="sc-row" style={{ gap: 8 }}>
                <Avatar fallback="KE" alt="Kim Esperat" />
                <strong>Kim Esperat</strong>
              </div>
              <div style={{ fontSize: 13 }}>
                Client #2035246 · 3 open invoices · last payment failed 2m ago.
              </div>
            </Stack>
          </HoverCardContent>
        </HoverCard>

        {/* Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit automation</SheetTitle>
              <SheetDescription>
                Payment failed → Slack, Sheets, Todoist.
              </SheetDescription>
            </SheetHeader>
            <Stack gap={12} style={{ padding: "16px 0" }}>
              <Field>
                <FieldLabel htmlFor="sheet-channel">Channel</FieldLabel>
                <Input id="sheet-channel" defaultValue="#pm-failed" />
              </Field>
            </Stack>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="secondary">Cancel</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="primary">Save</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="danger">
              <Trash2 size={14} aria-hidden="true" />
              Delete automation
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this automation?</AlertDialogTitle>
              <AlertDialogDescription>
                &quot;Payment failed → Slack&quot; will stop running for all
                clients. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* ContextMenu */}
      <h3 className="sc-sub">ContextMenu (right-click the row)</h3>
      <ContextMenu>
        <div
          style={{
            border: "1px dashed var(--fy-border, rgba(127,127,127,0.35))",
            borderRadius: 8,
            padding: 16,
            fontSize: 13,
            userSelect: "none",
          }}
        >
          Right-click: Payment failed → Slack (Kim Esperat)
        </div>
        <ContextMenuContent>
          <ContextMenuItem>
            <Pencil size={14} aria-hidden="true" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <RefreshCw size={14} aria-hidden="true" />
            Re-run
          </ContextMenuItem>
          <ContextMenuItem variant="danger">
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Command */}
      <h3 className="sc-sub">Command palette</h3>
      <div style={{ maxWidth: 420 }}>
        <Command>
          <CommandInput
            value={command}
            onValueChange={setCommand}
            placeholder="Search automations…"
          />
          <CommandList>
            <CommandEmpty>No automations found.</CommandEmpty>
            <CommandItem onSelect={() => setCommand("")}>
              Payment failed → Slack
            </CommandItem>
            <CommandItem onSelect={() => setCommand("")}>
              Invoice paid → Sheets
            </CommandItem>
            <CommandItem onSelect={() => setCommand("")}>
              Client created → Welcome email
            </CommandItem>
            <CommandItem onSelect={() => setCommand("")}>
              Quote approved → Todoist task
            </CommandItem>
          </CommandList>
        </Command>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Navigation section
 * ------------------------------------------------------------------ */

function NavigationSection() {
  const [page, setPage] = React.useState(3)

  return (
    <section className="sc-sect">
      <h2>Navigation</h2>

      <h3 className="sc-sub">Breadcrumb</h3>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Automations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Payment failed</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Slack action</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h3 className="sc-sub">Pagination</h3>
      <Pagination page={page} pageCount={12} onPageChange={setPage} />

      <h3 className="sc-sub">Sidebar</h3>
      <div style={{ maxWidth: 240 }}>
        <Sidebar>
          <SidebarSection title="Workspace">
            <SidebarItem icon={<Home size={16} aria-hidden="true" />} active>
              Overview
            </SidebarItem>
            <SidebarItem
              icon={<Workflow size={16} aria-hidden="true" />}
              trailing={<Badge variant="ok">3</Badge>}
            >
              Automations
            </SidebarItem>
            <SidebarItem icon={<Plug size={16} aria-hidden="true" />}>
              Connections
            </SidebarItem>
          </SidebarSection>
          <SidebarSection title="Account">
            <SidebarItem icon={<Settings size={16} aria-hidden="true" />}>
              Settings
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </div>

      <h3 className="sc-sub">Stepper</h3>
      <Stepper
        current={1}
        steps={[
          { label: "Trigger", description: "Jobber payment.failed" },
          { label: "Actions", description: "Slack, Sheets, Todoist" },
          { label: "Review", description: "Confirm & publish" },
        ]}
      />
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Feedback section
 * ------------------------------------------------------------------ */

function FeedbackSection() {
  const [bannerOpen, setBannerOpen] = React.useState(true)

  return (
    <section className="sc-sect">
      <h2>Feedback</h2>

      <h3 className="sc-sub">Alert</h3>
      <Stack gap={10}>
        <Alert variant="info">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            This automation runs on every matching Jobber event.
          </AlertDescription>
        </Alert>
        <Alert variant="danger">
          <AlertTitle>Delivery failed</AlertTitle>
          <AlertDescription>
            Slack rejected the last message to #pm-failed (invalid webhook).
          </AlertDescription>
        </Alert>
      </Stack>

      <h3 className="sc-sub">Banner</h3>
      {bannerOpen ? (
        <Banner variant="warn" onDismiss={() => setBannerOpen(false)}>
          Google Sheets is not connected — the Sheets action is paused.
        </Banner>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setBannerOpen(true)}
        >
          Restore banner
        </Button>
      )}

      <h3 className="sc-sub">Progress</h3>
      <Stack gap={8} style={{ maxWidth: 360 }}>
        <Progress value={72} />
        <span style={{ fontSize: 13 }} className="sc-muted">
          Backfilling run history — 72%
        </span>
      </Stack>

      <h3 className="sc-sub">Spinner &amp; Skeleton</h3>
      <div className="sc-row" style={{ gap: 16 }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <span className="sc-row" style={{ gap: 8 }}>
          <Spinner size="sm" />
          <span style={{ fontSize: 13 }}>Sending to Slack…</span>
        </span>
      </div>
      <Stack gap={8} style={{ marginTop: 14, maxWidth: 320 }}>
        <Skeleton style={{ height: 14, width: "60%" }} />
        <Skeleton style={{ height: 14, width: "90%" }} />
        <Skeleton style={{ height: 14, width: "75%" }} />
      </Stack>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Data display section
 * ------------------------------------------------------------------ */

function DataDisplaySection() {
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false)

  return (
    <section className="sc-sect">
      <h2>Data display</h2>

      <h3 className="sc-sub">Avatar &amp; AvatarGroup</h3>
      <div className="sc-row" style={{ gap: 16 }}>
        <Avatar fallback="KE" alt="Kim Esperat" />
        <Avatar fallback="OC" alt="Oak & Co" />
        <AvatarGroup>
          <Avatar fallback="KE" alt="Kim Esperat" />
          <Avatar fallback="RL" alt="Riverside Landscaping" />
          <Avatar fallback="NH" alt="Northside Homes" />
          <Avatar fallback="+4" alt="4 more clients" />
        </AvatarGroup>
      </div>

      <h3 className="sc-sub">Stat</h3>
      <div className="sc-grid3">
        <Stat label="Runs today" value="41" delta="+12%" deltaDirection="up" />
        <Stat label="Errors" value="2" delta="-1" deltaDirection="down" />
        <Stat label="Clients" value="128" hint="across 3 automations" />
      </div>

      <h3 className="sc-sub">Tag</h3>
      <div className="sc-row">
        <Tag>payments</Tag>
        <Tag>urgent</Tag>
        <Tag onRemove={() => {}}>slack</Tag>
        <Tag onRemove={() => {}}>#pm-failed</Tag>
      </div>

      <h3 className="sc-sub">CodeBlock</h3>
      <CodeBlock copyable>
        {`{
  "trigger": "payment.failed",
  "client": "{{client_name}}",
  "actions": ["slack", "sheets", "todoist"]
}`}
      </CodeBlock>

      <h3 className="sc-sub">Accordion</h3>
      <Accordion type="single" defaultValue="trigger">
        <AccordionItem value="trigger">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>
            Fires on Jobber <VariableChip name="payment.failed" /> for any
            client.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="actions">
          <AccordionTrigger>Actions</AccordionTrigger>
          <AccordionContent>
            Posts to Slack #pm-failed, appends a row to Sheets, and creates a
            Todoist task.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="schedule">
          <AccordionTrigger>Schedule</AccordionTrigger>
          <AccordionContent>Runs in real time, no schedule.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <h3 className="sc-sub">Collapsible</h3>
      <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
        <CollapsibleTrigger className="fy-btn fy-btn--outline fy-btn--sm">
          {collapsibleOpen ? "Hide" : "Show"} raw payload
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CodeBlock>{`{ "invoice_no": "INV-2035", "amount": 120.00 }`}</CodeBlock>
        </CollapsibleContent>
      </Collapsible>

      <h3 className="sc-sub">Timeline</h3>
      <Timeline>
        <TimelineItem dot={<CircleCheck size={12} aria-hidden="true" />}>
          <strong>Trigger received</strong> — payment.failed · 2m ago
        </TimelineItem>
        <TimelineItem dot={<Send size={12} aria-hidden="true" />}>
          <strong>Slack sent</strong> — #pm-failed · 2m ago
        </TimelineItem>
        <TimelineItem dot={<Clock size={12} aria-hidden="true" />}>
          <strong>Sheets retried</strong> — appended row · 1m ago
        </TimelineItem>
        <TimelineItem dot={<CircleX size={12} aria-hidden="true" />}>
          <strong>Todoist failed</strong> — token expired · 1m ago
        </TimelineItem>
      </Timeline>

      <h3 className="sc-sub">Tree</h3>
      <Tree>
        <TreeItem
          label="Automations"
          icon={<Folder size={14} aria-hidden="true" />}
          defaultOpen
        >
          <TreeItem
            label="Payment failed"
            icon={<Folder size={14} aria-hidden="true" />}
            defaultOpen
          >
            <TreeItem
              label="Slack action"
              icon={<FileText size={14} aria-hidden="true" />}
              selected
            />
            <TreeItem
              label="Sheets action"
              icon={<FileText size={14} aria-hidden="true" />}
            />
          </TreeItem>
          <TreeItem
            label="Invoice paid"
            icon={<Folder size={14} aria-hidden="true" />}
          >
            <TreeItem
              label="Thank-you email"
              icon={<FileText size={14} aria-hidden="true" />}
            />
          </TreeItem>
        </TreeItem>
      </Tree>

      <h3 className="sc-sub">Carousel</h3>
      <Carousel label="Connected apps">
        <Card>
          <CardHeader>
            <CardTitle>Jobber</CardTitle>
            <CardDescription>Connected · 2035246</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Slack</CardTitle>
            <CardDescription>#pm-failed</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Google Sheets</CardTitle>
            <CardDescription>Not connected</CardDescription>
          </CardHeader>
        </Card>
      </Carousel>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Data (tables / dates / files) section
 * ------------------------------------------------------------------ */

interface RunRow extends Record<string, unknown> {
  automation: string
  client: string
  result: "Sent" | "Retried" | "Failed"
  duration: number
  when: string
}

const RUN_DATA: RunRow[] = [
  {
    automation: "Payment failed → Slack",
    client: "Kim Esperat",
    result: "Sent",
    duration: 210,
    when: "2m ago",
  },
  {
    automation: "Invoice paid → Sheets",
    client: "Oak & Co",
    result: "Retried",
    duration: 880,
    when: "18m ago",
  },
  {
    automation: "Payment failed → Todoist",
    client: "Northside Homes",
    result: "Failed",
    duration: 1240,
    when: "1h ago",
  },
  {
    automation: "Client created → Email",
    client: "Riverside Landscaping",
    result: "Sent",
    duration: 340,
    when: "3h ago",
  },
  {
    automation: "Quote approved → Todoist",
    client: "Maple Grove HOA",
    result: "Sent",
    duration: 190,
    when: "5h ago",
  },
]

const RESULT_VARIANT: Record<RunRow["result"], "ok" | "warn" | "danger"> = {
  Sent: "ok",
  Retried: "warn",
  Failed: "danger",
}

const RUN_COLUMNS: DataTableColumn<RunRow>[] = [
  { key: "automation", header: "Automation", sortable: true },
  { key: "client", header: "Client", sortable: true },
  {
    key: "result",
    header: "Result",
    sortable: true,
    render: (value) => (
      <Badge variant={RESULT_VARIANT[value as RunRow["result"]]}>
        {value as string}
      </Badge>
    ),
  },
  {
    key: "duration",
    header: "Duration (ms)",
    sortable: true,
    numeric: true,
  },
  { key: "when", header: "When", sortable: true },
]

function DataSection() {
  const [date, setDate] = React.useState<Date | null>(new Date())
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <section className="sc-sect">
      <h2>Data</h2>

      <h3 className="sc-sub">DataTable — run log (sortable, filterable)</h3>
      <DataTable
        columns={RUN_COLUMNS}
        data={RUN_DATA}
        pageSize={4}
        searchPlaceholder="Search runs…"
      />

      <h3 className="sc-sub">Calendar &amp; DatePicker</h3>
      <div className="sc-grid2">
        <Calendar value={date} onChange={setDate} />
        <Stack gap={10}>
          <Field>
            <FieldLabel htmlFor="run-date">Run date</FieldLabel>
            <DatePicker value={date} onChange={setDate} />
            <FieldHint>
              Selected:{" "}
              {date ? date.toLocaleDateString() : "none"}
            </FieldHint>
          </Field>
        </Stack>
      </div>

      <h3 className="sc-sub">FileUpload</h3>
      <FileUpload accept=".csv,.json" onFiles={setFiles} />
      {files.length > 0 ? (
        <p className="sc-muted" style={{ fontSize: 13, marginTop: 8 }}>
          {files.length} file{files.length === 1 ? "" : "s"} selected.
        </p>
      ) : null}
    </section>
  )
}

/** Is the given mode showing dark right now (resolving "system")? */
function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === "dark") return true
  if (mode === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function Showcase() {
  const [theme, setTheme] = React.useState<ThemeMode>("system")
  const [presetId, setPresetId] = React.useState<string>("default")
  const [densityId, setDensityId] = React.useState<string>("cozy")

  // Load persisted theme + preset + density once on mount.
  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null
    if (stored && THEME_ORDER.includes(stored)) setTheme(stored)
    const storedPreset = localStorage.getItem(PRESET_KEY)
    if (storedPreset && PRESETS.some((p) => p.id === storedPreset)) {
      setPresetId(storedPreset)
    }
    const storedDensity = localStorage.getItem(DENSITY_KEY)
    if (storedDensity && DENSITIES.some((d) => d.id === storedDensity)) {
      setDensityId(storedDensity)
    }
  }, [])

  // Apply density independently of theme/mode.
  React.useEffect(() => {
    const density = DENSITIES.find((d) => d.id === densityId) ?? DENSITIES[1]
    applyDensity(density)
    localStorage.setItem(DENSITY_KEY, densityId)
  }, [densityId])

  // Reflect the light/dark mode onto the document root and persist it.
  React.useEffect(() => {
    document.documentElement.className = theme === "system" ? "" : theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // Apply the chosen preset's token overrides. Re-runs when the preset OR the
  // light/dark mode changes, so the correct variant (light/dark) is applied.
  React.useEffect(() => {
    const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]
    applyPreset(preset, resolveIsDark(theme))
    localStorage.setItem(PRESET_KEY, presetId)

    // When mode is "system", the OS can flip dark/light under us — re-apply.
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (theme === "system") applyPreset(preset, mq.matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [presetId, theme])

  const cycleTheme = () =>
    setTheme((current) => {
      const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length]
      return next
    })

  return (
    <TooltipProvider delayDuration={200}>
      <ToastProvider>
        {/* Header bar */}
        <header className="sc-bar">
          <div className="sc-brand">
            <span className="sc-mark">
              <Zap size={13} aria-hidden="true" />
            </span>
            fiftyyears
          </div>
          <span className="sc-tag">design system</span>
          <span style={{ flex: 1 }} />
          <label className="sc-preset">
            <span className="sc-preset__swatch" style={{ background: (PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]).swatch }} />
            <select
              className="sc-preset__select"
              value={presetId}
              onChange={(e) => setPresetId(e.target.value)}
              aria-label="Theme preset"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="sc-preset">
            <span className="sc-preset__label">Density</span>
            <select
              className="sc-preset__select"
              value={densityId}
              onChange={(e) => setDensityId(e.target.value)}
              aria-label="Density"
            >
              {DENSITIES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <Button variant="secondary" size="sm" onClick={cycleTheme}>
            Theme: {theme}
          </Button>
        </header>

        <main className="sc-wrap">
          <p className="sc-lede" style={{ fontStyle: "italic" }}>
            {(PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]).blurb}
          </p>
          <p className="sc-lede">
            Every component in the fiftyyears design system, rendered with real
            automation-platform content — Jobber triggers, Slack and Sheets
            actions, and {"{{variables}}"}. This is the single page the system is
            iterated on.
          </p>

          {/* Typography specimen — reflects the active theme's type system */}
          <section className="sc-sect">
            <h2>Typography</h2>
            <TypeSpecimen />
          </section>

          {/* 1. Buttons */}
          <section className="sc-sect">
            <h2>Buttons</h2>
            <div className="sc-col">
              <div className="sc-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="sc-row">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
                <Button size="icon" aria-label="New automation">
                  <Plus size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </section>

          {/* 2. Form */}
          <section className="sc-sect">
            <h2>Form</h2>
            <div className="sc-grid2">
              <Field>
                <FieldLabel htmlFor="channel">Channel</FieldLabel>
                <Input id="channel" defaultValue="#pm-failed" />
                <FieldHint>Where the alert is posted.</FieldHint>
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input id="amount" inputMode="decimal" defaultValue="120.00" />
                <FieldHint>Invoice total, in USD.</FieldHint>
              </Field>
            </div>
            <div className="sc-col" style={{ marginTop: 14 }}>
              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  rows={3}
                  defaultValue="Payment failed for {{client_name}}"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="trigger">Trigger</FieldLabel>
                <Select defaultValue="payment.failed">
                  <SelectTrigger id="trigger" aria-label="Trigger">
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment.failed">payment.failed</SelectItem>
                    <SelectItem value="invoice.paid">invoice.paid</SelectItem>
                    <SelectItem value="client.created">client.created</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </section>

          {/* 3. Switches & badges */}
          <section className="sc-sect">
            <h2>Switches &amp; badges</h2>
            <div className="sc-col">
              <div className="sc-row">
                <Switch id="auto-save" defaultChecked />
                <Label htmlFor="auto-save">Auto-save</Label>
              </div>
              <div className="sc-row">
                <Switch id="published" defaultChecked />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <Separator style={{ margin: "16px 0" }} />
            <div className="sc-row">
              <Badge variant="default">Published</Badge>
              <Badge variant="ok">Connected</Badge>
              <Badge variant="warn">Flagged</Badge>
              <Badge variant="danger">Failed</Badge>
              <Badge variant="muted">Draft</Badge>
            </div>
          </section>

          {/* 4. Status & variables */}
          <section className="sc-sect">
            <h2>Status &amp; variables</h2>
            <div className="sc-row">
              <span className="sc-row" style={{ gap: 6 }}>
                <StatusDot variant="ok" pulse aria-label="Live" />
                <span>Live</span>
              </span>
              <span className="sc-row" style={{ gap: 6 }}>
                <StatusDot variant="warn" aria-label="Degraded" />
                <span>Degraded</span>
              </span>
              <span className="sc-row" style={{ gap: 6 }}>
                <StatusDot variant="danger" aria-label="Failed" />
                <span>Failed</span>
              </span>
              <span className="sc-row" style={{ gap: 6 }}>
                <StatusDot variant="off" aria-label="Off" />
                <span>Off</span>
              </span>
            </div>
            <div className="sc-row" style={{ marginTop: 14 }}>
              <VariableChip name="client_name" />
              <VariableChip name="amount" />
              <VariableChip name="invoice_no" />
            </div>
            <div className="sc-row" style={{ marginTop: 14 }}>
              <span>Save</span>
              <Kbd>Cmd</Kbd>
              <Kbd>S</Kbd>
            </div>
          </section>

          {/* 5. Tabs */}
          <section className="sc-sect">
            <h2>Tabs</h2>
            <Tabs defaultValue="published">
              <TabsList>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="published">
                3 automations live. Payment failed → Slack, Sheets, Todoist.
              </TabsContent>
              <TabsContent value="drafts">
                1 draft — “Invoice paid → thank-you email”.
              </TabsContent>
              <TabsContent value="logs">
                Last run 2 minutes ago. 41 runs today, 0 errors.
              </TabsContent>
            </Tabs>
          </section>

          {/* 6. Cards */}
          <section className="sc-sect">
            <h2>Cards</h2>
            <div className="sc-grid3">
              <Card>
                <CardHeader>
                  <CardTitle>Jobber</CardTitle>
                  <CardDescription>
                    <span className="sc-row" style={{ gap: 6 }}>
                      <StatusDot variant="ok" aria-hidden="true" />
                      Connected · 2035246
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="secondary" size="sm">
                    <RefreshCw size={14} aria-hidden="true" />
                    Reconnect
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Sheets</CardTitle>
                  <CardDescription>
                    <span className="sc-row" style={{ gap: 6 }}>
                      <StatusDot variant="off" aria-hidden="true" />
                      Not connected
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="primary" size="sm">
                    Connect
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Runs today</CardTitle>
                  <CardDescription>Across all automations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="sc-stat fy-num">41</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 7. Automation flow */}
          <section className="sc-sect">
            <h2>Automation flow</h2>
            <div>
              <Node>
                <span className="sc-row" style={{ gap: 8 }}>
                  <StatusDot variant="ok" pulse aria-hidden="true" />
                  <strong>WHEN</strong>
                  <span>jobber</span>
                  <VariableChip name="payment.failed" />
                </span>
              </Node>
              <NodeConnector />
              <Node
                trailing={<Badge variant="ok">live</Badge>}
              >
                <span className="sc-row" style={{ gap: 8 }}>
                  <StatusDot variant="ok" aria-hidden="true" />
                  <strong>THEN</strong>
                  <span>slack</span>
                  <span className="sc-tag">#pm-failed</span>
                </span>
              </Node>
              <NodeConnector />
              <Node trailing={<Badge variant="muted">off</Badge>}>
                <span className="sc-row" style={{ gap: 8 }}>
                  <StatusDot variant="off" aria-hidden="true" />
                  <strong>THEN</strong>
                  <span>todoist</span>
                  <span className="sc-tag">Payments</span>
                </span>
              </Node>
            </div>
            <div className="sc-row" style={{ marginTop: 14 }}>
              <Button variant="outline">
                <Plus size={14} aria-hidden="true" />
                Add action
              </Button>
            </div>
          </section>

          {/* 8. Table */}
          <section className="sc-sect">
            <h2>Table</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Automation</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Payment failed → Slack</TableCell>
                  <TableCell>Riverside Landscaping</TableCell>
                  <TableCell>
                    <Badge variant="ok">Sent</Badge>
                  </TableCell>
                  <TableCell className="fy-num">2m ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Invoice paid → Sheets</TableCell>
                  <TableCell>Oak &amp; Co</TableCell>
                  <TableCell>
                    <Badge variant="warn">Retried</Badge>
                  </TableCell>
                  <TableCell className="fy-num">18m ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment failed → Todoist</TableCell>
                  <TableCell>Northside Homes</TableCell>
                  <TableCell>
                    <Badge variant="danger">Failed</Badge>
                  </TableCell>
                  <TableCell className="fy-num">1h ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          {/* 9. Overlays (dialog / tooltip / toast) */}
          <section className="sc-sect">
            <h2>Dialog, tooltip &amp; toast</h2>
            <div className="sc-row">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="danger">
                    <Trash2 size={14} aria-hidden="true" />
                    Delete draft
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete draft?</DialogTitle>
                    <DialogDescription>
                      This permanently removes “Invoice paid → thank-you email”.
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="danger">Delete</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Hover for tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>Runs on every matching event</TooltipContent>
              </Tooltip>

              <PublishToastButton />
            </div>
          </section>

          {/* 10. Empty state */}
          <section className="sc-sect">
            <h2>Empty state</h2>
            <EmptyState
              icon={<Sparkles size={22} aria-hidden="true" />}
              title="No automations yet"
              description="Connect a trigger to start automating your workflow."
            >
              <Button variant="primary">
                <Plus size={14} aria-hidden="true" />
                New automation
              </Button>
            </EmptyState>
          </section>

          {/* ---- Extended coverage: every remaining component ---- */}
          <LayoutSection />
          <FormControlsSection />
          <OverlaysSection />
          <NavigationSection />
          <FeedbackSection />
          <DataDisplaySection />
          <DataSection />
        </main>

        <Toaster />
      </ToastProvider>
    </TooltipProvider>
  )
}
