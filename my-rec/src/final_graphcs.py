# Bitania Ketema Samuel
# Final Project Submission

import numpy as np
import matplotlib.pyplot as plt

# Implementing DDA Line Drawing Algorithm
def dda_line(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    steps = max(abs(dx), abs(dy))

    x_inc = dx / float(steps)
    y_inc = dy / float(steps)

    x = x1
    y = y1
    line_points = []
    for _ in range(steps):
        line_points.append((round(x), round(y)))
        x += x_inc
        y += y_inc
    return line_points

# Implementing Bresenham's Line Drawing Algorithm
def bresenham_line(x1, y1, x2, y2):
    dx = abs(x2 - x1)
    dy = abs(y2 - y1)
    x, y = x1, y1
    sx = -1 if x1 > x2 else 1
    sy = -1 if y1 > y2 else 1

    err = dx - dy
    line_points = []
    while True:
        line_points.append((x, y))
        if x == x2 and y == y2:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x += sx
        if e2 < dx:
            err += dx
            y += sy
    return line_points

# Creating images to draw the lines
image_size = (200, 200)
dda_image = np.zeros(image_size)
bresenham_image = np.zeros(image_size)

# Adjusting the line endpoints to make the lines steeper
x1, y1, x2, y2 = 20, 20, 60, 180

# Re-drawing lines using both algorithms with steeper angles
dda_points_steep = dda_line(x1, y1, x2, y2)
bresenham_points_steep = bresenham_line(x1, y1, x2, y2)

# Resetting the images for the new lines
dda_image_steep = np.zeros(image_size)
bresenham_image_steep = np.zeros(image_size)

# Plotting the points on the new images
for x, y in dda_points_steep:
    dda_image_steep[y, x] = 255
for x, y in bresenham_points_steep:
    bresenham_image_steep[y, x] = 255

# Display the new images side by side
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(dda_image_steep, cmap='gray')
axes[0].set_title('DDA Line')
axes[0].axis('off')

axes[1].imshow(bresenham_image_steep, cmap='gray')
axes[1].set_title('Bresenham Line')
axes[1].axis('off')

plt.show()


'''
in the displayed images, we see that the small line segement produced in the bresenhams
algorithm are more continous and smooth compared to those for DDA. This can be seen when we zoom in 
and look at the small linesegment, the ones in DDA are not consistent (some are smaller that the others) compared
to the ones in the Bresenhams. 
'''
