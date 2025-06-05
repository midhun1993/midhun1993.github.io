---
layout: page
title: 🔔 ngx-mp-notification
permalink: /angular-mp-package-docs/ngx-mp-notification
nav_exclude: true
---

A lightweight and customizable Angular notification plugin.

## Installation:

```bash
npm install ngx-mp-notification
```

## Usage:

### Import notification service in `app.component.ts`:

```ts
import { NgMpNotificationService} from 'ng-mp-notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private notifier: NgMpNotificationService
  ){}
}
```
---

### Alert:

Function signature

```ts
alert(headline: string, description:string, conf:NgxMpAlertConfig ): void
```

#### Usage:

```ts
    this.notifier.alert("Hey There", "This is an alert", {
      ok: () => {}
    })
```
---

### Warning:

Function signature

```ts
alert(headline: string, description:string, conf:NgxMpWarningConfig ): void
```

#### Usage:

```ts
    this.notifier.warning("Hey There", "This is an warning", {
      ok: () => {},
      cancel: () => {}
    })
```
---

### Generic:

Function signature

```ts
generic(headline: string, description:string, conf:NgxMpGenericConfig ): void
```

#### Usage:

```ts
  const notifier = this.notifier.generic("Hey There", "This is an generic")
  notifier.addAction("okay", "Okay", () => console.log("Okay"))
  notifier.addAction("maybe", "May be", () => console.log("May be"))
  notifier.addAction("cancel", "Cancel", () => console.log("Cancel"))
  notifier.fire();
```
### Override styles:

You can use below css variable in you `style.css` to override the styles

```css
    --ngx-mp-n-wrapper-bg-color:  rgba(0, 0, 0, 0.2);
    --ngx-mp-n-wrapper-font-family: Arial, sans-serif;
    --ngx-mp-n-headline-font-size:  1.25rem;
    --ngx-mp-n-headline-font-weight: 700;
    --ngx-mp-n-headline-font-color:  #d9534f;
    --ngx-mp-n-content-font-size: 1rem;
    --ngx-mp-n-content-font-color:  #555;
    --ngx-mp-n-action-font-size: 1rem

```
