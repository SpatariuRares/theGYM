---

database-plugin: basic

---

```yaml:dbfolder
name: new database
description: new description
columns:
  __file__:
    key: __file__
    id: __file__
    input: markdown
    label: File
    accessorKey: __file__
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    position: 0
    isHidden: false
    sortIndex: -1
    width: 142
    isSorted: false
    isSortedDesc: false
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  Macchina:
    input: relation
    accessorKey: Macchina
    key: Macchina
    id: Macchina
    label: Macchina
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 344
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      related_note_path: theGYM/macchine/machine database.md
      wrap_content: false
      relation_color: hsl(0,54%,64%)
  tags:
    input: tags
    accessorKey: tags
    key: tags
    id: tags
    label: tags
    position: 100
    skipPersist: false
    isHidden: false
    sortIndex: 0
    width: 282
    isSorted: true
    isSortedDesc: true
    options:
      - { label: "granDorsale", value: "granDorsale", color: "hsl(206, 95%, 90%)"}
      - { label: "gambe", value: "gambe", color: "hsl(332, 95%, 90%)"}
      - { label: "quadricip", value: "quadricip", color: "hsl(332, 95%, 90%)"}
      - { label: "glutes", value: "glutes", color: "hsl(255, 95%, 90%)"}
      - { label: "forza", value: "forza", color: "hsl(46, 95%, 90%)"}
      - { label: "tricipiti", value: "tricipiti", color: "hsl(174, 95%, 90%)"}
      - { label: "quadricipiti", value: "quadricipiti", color: "hsl(227, 95%, 90%)"}
      - { label: "glutei", value: "glutei", color: "hsl(244, 95%, 90%)"}
      - { label: "equilibrio", value: "equilibrio", color: "hsl(58, 95%, 90%)"}
      - { label: "compound", value: "compound", color: "hsl(286, 95%, 90%)"}
      - { label: "petto", value: "petto", color: "hsl(216, 95%, 90%)"}
      - { label: "pettorale", value: "pettorale", color: "hsl(260, 95%, 90%)"}
      - { label: "isolamento", value: "isolamento", color: "hsl(2, 95%, 90%)"}
      - { label: "flessibilità", value: "flessibilità", color: "hsl(241, 95%, 90%)"}
      - { label: "spalle", value: "spalle", color: "hsl(240, 95%, 90%)"}
      - { label: "braccia", value: "braccia", color: "hsl(57, 95%, 90%)"}
      - { label: "deltoidi", value: "deltoidi", color: "hsl(273, 95%, 90%)"}
      - { label: "schiena", value: "schiena", color: "hsl(239, 95%, 90%)"}
      - { label: "dorso", value: "dorso", color: "hsl(73, 95%, 90%)"}
      - { label: "bicipiti", value: "bicipiti", color: "hsl(281, 95%, 90%)"}
      - { label: "trapezoidi", value: "trapezoidi", color: "hsl(81, 95%, 90%)"}
      - { label: "femorali", value: "femorali", color: "hsl(219, 95%, 90%)"}
      - { label: "core", value: "core", color: "hsl(358, 95%, 90%)"}
      - { label: "stabilità", value: "stabilità", color: "hsl(276, 95%, 90%)"}
      - { label: "avambracci", value: "avambracci", color: "hsl(195, 95%, 90%)"}
      - { label: "deltoidi-posteriori", value: "deltoidi-posteriori", color: "hsl(138, 95%, 90%)"}
      - { label: "postura", value: "postura", color: "hsl(194, 95%, 90%)"}
      - { label: "deltoidi-laterali", value: "deltoidi-laterali", color: "hsl(26, 95%, 90%)"}
      - { label: "pettorale-superiore", value: "pettorale-superiore", color: "hsl(279, 95%, 90%)"}
      - { label: "addominali", value: "addominali", color: "hsl(231, 95%, 90%)"}
      - { label: "isometrico", value: "isometrico", color: "hsl(121, 95%, 90%)"}
      - { label: "addominali-obliqui", value: "addominali-obliqui", color: "hsl(315, 95%, 90%)"}
      - { label: "rotazione", value: "rotazione", color: "hsl(150, 95%, 90%)"}
      - { label: "addominali-inferiori", value: "addominali-inferiori", color: "hsl(102, 95%, 90%)"}
      - { label: "macchina", value: "macchina", color: "hsl(144, 95%, 90%)"}
      - { label: "abduttori", value: "abduttori", color: "hsl(20, 95%, 90%)"}
      - { label: "smith machine", value: "smith machine", color: "hsl(225, 95%, 90%)"}
      - { label: "lombari", value: "lombari", color: "hsl(115, 95%, 90%)"}
      - { label: "erettori spinali", value: "erettori spinali", color: "hsl(145, 95%, 90%)"}
      - { label: "hamstring", value: "hamstring", color: "hsl(239, 95%, 90%)"}
      - { label: "corpo libero", value: "corpo libero", color: "hsl(282, 95%, 90%)"}
      - { label: "brachiale", value: "brachiale", color: "hsl(269, 95%, 90%)"}
      - { label: "unilaterale", value: "unilaterale", color: "hsl(129, 95%, 90%)"}
      - { label: "manubri", value: "manubri", color: "hsl(299, 95%, 90%)"}
      - { label: "cavi", value: "cavi", color: "hsl(304, 95%, 90%)"}
      - { label: "obliqui", value: "obliqui", color: "hsl(59, 95%, 90%)"}
      - { label: "anti-rotazione", value: "anti-rotazione", color: "hsl(304, 95%, 90%)"}
      - { label: "addominali bassi", value: "addominali bassi", color: "hsl(292, 95%, 90%)"}
      - { label: "deltoidi posteriori", value: "deltoidi posteriori", color: "hsl(296, 95%, 90%)"}
      - { label: "trapezio", value: "trapezio", color: "hsl(99, 95%, 90%)"}
      - { label: "romboidi", value: "romboidi", color: "hsl(332, 95%, 90%)"}
      - { label: "cuffia dei rotatori", value: "cuffia dei rotatori", color: "hsl(315, 95%, 90%)"}
      - { label: "sovraccarico", value: "sovraccarico", color: "hsl(301, 95%, 90%)"}
      - { label: "polpacci", value: "polpacci", color: "hsl(251, 95%, 90%)"}
      - { label: "brachioradiale", value: "brachioradiale", color: "hsl(129, 95%, 90%)"}
      - { label: "avambraccio", value: "avambraccio", color: "hsl(84, 95%, 90%)"}
      - { label: "gran dorsale", value: "gran dorsale", color: "hsl(26, 95%, 90%)"}
      - { label: "deltoidi laterali", value: "deltoidi laterali", color: "hsl(337, 95%, 90%)"}
      - { label: "trapezio superiore", value: "trapezio superiore", color: "hsl(124, 95%, 90%)"}
      - { label: "ischio-crurali", value: "ischio-crurali", color: "hsl(234, 95%, 90%)"}
      - { label: "bodyweight", value: "bodyweight", color: "hsl(87, 95%, 90%)"}
      - { label: "dinamico", value: "dinamico", color: "hsl(81, 95%, 90%)"}
      - { label: "bilanciere", value: "bilanciere", color: "hsl(122, 95%, 90%)"}
      - { label: "schiena alta", value: "schiena alta", color: "hsl(35, 95%, 90%)"}
      - { label: "pettorali alti", value: "pettorali alti", color: "hsl(135, 95%, 90%)"}
      - { label: "clavicolari", value: "clavicolari", color: "hsl(43, 95%, 90%)"}
      - { label: "trasverso addominale", value: "trasverso addominale", color: "hsl(312, 95%, 90%)"}
      - { label: "controllo respiratorio", value: "controllo respiratorio", color: "hsl(187, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
config:
  remove_field_when_delete_column: false
  cell_size: normal
  sticky_first_column: false
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: false
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  show_metadata_tags: false
  source_data: current_folder
  source_form_result: 
  source_destination_path: /
  row_templates_folder: /
  current_row_template: 
  pagination_size: 120
  font_size: 16
  enable_js_formulas: false
  formula_folder_path: /
  inline_default: false
  inline_new_position: last_field
  date_format: yyyy-MM-dd
  datetime_format: "yyyy-MM-dd HH:mm:ss"
  metadata_date_format: "yyyy-MM-dd HH:mm:ss"
  enable_footer: false
  implementation: default
filters:
  enabled: false
  conditions:
```