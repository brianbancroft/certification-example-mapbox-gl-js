Mapbox Certification Example
---

This is a dashboard example for the Mapbox Certification. I've also writen about this on my personal blog, which you can find at (ADD SITE HERE).

## Criteria

The following headers are invidual criteria:

### Map should have a custom (non-default) style
There are two styles for this site. The first one is something I've generated, and might have tweaked in the past.
  - 'mapbox://styles/brianbancroft/ck2r23wm408me1csue4nbr8zq'

  The other one is a stock satellite view.

### Map should present a series of points, updating in real-time

### Hovering over a point should change a visual attribute (size,  color, etc)

### Hovering over a point should create a popup

### Popups should contain data from an external source AND properties of the point

### Map should be searchable

### Map should center on click

### Clicking on point should add an HTML marker

### Points should be filterable based on properties (through some kind UI)

### Map should switch to satellite imagery as user zooms

This part I used the "zoomend" handler as to mimimize the amount of changes required throughout the lifecycle of the app. I used the following style:

-  'mapbox://styles/mapbox/satellite-v9'


