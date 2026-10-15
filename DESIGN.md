---
name: Dentax
description: A private dental clinic site that stays quiet, unhurried and specific.
colors:
  lavender-mist: "#e8e0f0"
  forest-green: "#1f4d3f"
  forest-green-hover: "#28604e"
  deep-footer-green: "#14352b"
  warm-sand: "#efe7dc"
  off-white: "#faf9f7"
  ink: "#1a1815"
  soft-ink: "#4a4540"
  hairline: "#e8e5e0"
  field-line: "#8f8982"
  error-clay: "#b3402f"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(56px, 11vw, 168px)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(36px, 4.5vw, 56px)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "3xl": "48px"
  "6xl": "96px"
components:
  button-primary:
    backgroundColor: "{colors.lavender-mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "#dcd1e8"
  button-cta:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-cta-hover:
    backgroundColor: "{colors.forest-green-hover}"
---

# Design System: Dentax

## Overview

**Creative North Star: "The Unhurried Consulting Room"**

Dentax looks like a well-lit private room where nobody is rushing you: off-white walls, a lot of air, one deep green for decisions, and lavender and sand as soft surfaces. The page explains before it asks. Large light serif headlines carry the voice; small, plain sans-serif text carries the facts (steps, durations, prices).

Density is low and rhythm is slow. Sections are tall, type is large and light, and motion is smooth rather than showy: Lenis scrolling, stacked treatment bands that slide over each other, a single pearl blob that turns on its own. Nothing flashes, counts down or competes for attention.

The system rejects clinical blue-and-white, stock-smile photography, urgency banners and anything that sounds like marketing copy. Lavender stays a surface colour; green carries the action.

**Key Characteristics:**
- Light serif display over plain sans body.
- Off-white base, lavender and sand surfaces, one forest green accent.
- Tall, airy sections; sticky stacked bands for treatments; a footer revealed from underneath.
- Motion is slow, eased and always switched off under reduced motion.

## Colors

A near-monochrome warm neutral palette with one deep green and two soft surface tints.

### Primary
- **Forest Green** (#1f4d3f): The one action and emphasis colour: primary CTA, italic emphasis in headlines, labels, focus rings, hover on links. Hover shifts to #28604e.
- **Deep Footer Green** (#14352b): The darkest layer of the footer waves and the dark band; never used for text on light.

### Secondary
- **Lavender Mist** (#e8e0f0): A soft surface: buttons, the hero blob, chips, one wave in the footer. It is not an accent; it never carries text-sized emphasis.
- **Warm Sand** (#efe7dc): A second surface for bands and the footer background gradient.

### Neutral
- **Off-White** (#faf9f7): Page background.
- **Ink** (#1a1815): Headlines and primary text.
- **Soft Ink** (#4a4540): Body copy, ledes, secondary labels.
- **Hairline** (#e8e5e0): Dividers and card borders.
- **Field Line** (#8f8982): Form field borders (meets non-text contrast).
- **Error Clay** (#b3402f): Validation errors only.

### Named Rules
**The One Action Rule.** Forest green marks what the visitor can do or what matters most. Lavender and sand are only ever surfaces.
**The No-Purple-Text Rule.** Lavender is never used for text or thin lines; that made the page feel purple everywhere and was removed on purpose.

## Typography

**Display Font:** Newsreader (Georgia fallback), weight 300, with italics for emphasis.
**Body Font:** Inter (system sans fallback), weights 400, 500, 600.

**Character:** A light editorial serif that feels like a printed clinic brochure, paired with a plain, legible sans for anything the visitor must read exactly.

### Hierarchy
- **Display** (300, clamp(56px, 11vw, 168px), 0.98): The hero headline only.
- **Headline** (300, clamp(36px, 4.5vw, 56px), 1.1): Section headings; the `big` variant goes to clamp(40px, 5vw, 72px).
- **Body** (400, 16px, 1.5): Descriptions and form text; ledes at 18px; keep lines to about 58ch.
- **Label** (500, 12px, 0.1em, uppercase): Eyebrows, section labels and small captions.

### Named Rules
**The Light-Serif Rule.** Display type stays at weight 300 with tight tracking; heavier weights belong to sans UI text.
**The Plain-Facts Rule.** Anything with numbers (durations, prices, hours) is set in Inter, not Newsreader.

## Layout

Single column with generous horizontal padding (`clamp(24px, 5vw, 64px)`) inside a 1440px max width. Sections are tall with 96px-class vertical rhythm. Treatments are sticky full-width bands that overlap as you scroll (static below 640px). The doctors section is a bento grid whose cards expand on tap and shrink their neighbours. The footer is fixed underneath the page and revealed as the last section scrolls away; it falls back to a normal footer when taller than the screen. Breakpoints used: 900px and 640px.

## Elevation & Depth

Mostly flat. Depth comes from stacking (sticky bands sliding over each other, the footer under the page) and tonal surfaces rather than shadows. Shadows appear only as a response to hover.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 4px 8px rgba(0,0,0,0.08)`): buttons on hover.

### Named Rules
**The Flat-At-Rest Rule.** Nothing carries a shadow until it is interacted with.

## Shapes

Gently rounded: 8px on buttons, fields and cards (`rounded.lg`), 4–6px on small controls. Hairline 1px borders; fields use the darker field line. Photos are rectangular with the same radius, plus clip-path reveals on entrance. The hero blob is the only organic form on the page.

## Components

### Buttons
- **Shape:** 8px radius.
- **Primary:** Lavender surface with ink text for design-system buttons; forest green with off-white text for the main "Book a visit" call to action.
- **Hover / Focus:** Colour shift plus a 1px lift on design-system buttons; arrow buttons get an animated underline; focus is a 2px green outline with 2px offset.

### Inputs / Fields
- **Style:** Custom dropdown and date picker matching the form: 1px field-line border, off-white fill, 8px radius.
- **Focus:** Green border and outline; keyboard navigation with arrow keys; errors in error clay with an icon and text.

### Doctors bento
Tiles expand on tap with a 1000ms `cubic-bezier(0.01, 0.45, 0.25, 1)` (fast start, slow finish) while neighbours shrink.

### Footer
Cream gradient, four link columns, small icon buttons (springing up on hover) and three softly blurred, grained waves in lavender, sage and deep green that breathe slowly.

## Persian (fa) and right-to-left

The site ships in English and Persian. A toggle (EN | فارسی) sits in the top corner of the hero, in the quick bar and in the phone menu; the choice is remembered in `localStorage` (`dentax:lang`) and sets `lang` and `dir` on `<html>`.

**Persian font:** Vazirmatn (variable, self-hosted through `@fontsource-variable/vazirmatn`), weight 300 for headlines and 400-500 for text. It keeps the brand's light, quiet voice and is the most readable Persian face on screen for facts such as steps and hours. English visitors never download it. Persian uses one family at two weights instead of serif plus sans, since there is no Persian equivalent of a light editorial serif that stays this legible.

### Named Rules
**The No-Tracking Rule.** Arabic script joins its letters: no `letter-spacing`, no `text-transform`, no italic. Emphasis in Persian is the forest-green colour only.
**The Mirror Rule.** Layout mirrors through logical properties and grid/flex order; only directional things flip (arrows, calendar chevrons, hover motion). Photos, the logotype and the before/after slider do not.
**The Persian Numerals Rule.** Numbers are shown in Persian digits on the Persian page (`n()` in `src/i18n.jsx`); phone numbers and email addresses stay left to right.

Translations live in `src/fa.js`, keyed by the exact English text.

## Do's and Don'ts

### Do:
- **Do** keep forest green for actions and emphasis, and lavender and sand for surfaces.
- **Do** write specific, checkable copy: real durations, steps, what you will feel.
- **Do** respect reduced motion; every animation has a still fallback.
- **Do** keep keyboard operation and visible focus on every custom control.

### Don't:
- **Don't** use lavender for text, thin rules or large flat fills of the page.
- **Don't** add urgency (countdowns, "limited slots") or outcome guarantees.
- **Don't** split the hero blob into pieces; it stays one rotating pearl.
- **Don't** add shadows at rest or decorative gradients on text.
