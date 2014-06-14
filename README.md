AlphaJPEG
=========

What is it?
-----------

AlphaJPEG is a JavaScript library for the generation and consumption of JPEG
images which contain extra information to obtain an alpha channel.


Why is this useful?
-------------------

Though, WebP allows for superior (to JPEG) lossy compression with an alpha channel, it is not a viable image format in the modern browser landscape. Once WebP takes over, this tool will be obsolete.

This tool will allow you to perform lossy compression on an image with an alpha channel in an image format supported by all modern browsers. Anecdotally, this results in a JPEG 20-50% of the original PNG file size with very little discernible artifacts.


How does it work?
-----------------

A source image with an alpha channel is rendered onto a white background and a
black background. These two images are combined into a single JPEG image which
is twice the original image's width and lacks the original image's alpha
channel.

To render, the red, green, and blue channels are obtained (via averaging) from
the images rendered on white and black backgrounds. The alpha channel is
obtained by calculating the delta of the white and black image's green
channels. The green channel is used because JPEG images have higher green
channel quality than the other two, since green is the most sensitive color to
the human eye.


What does it work on?
---------------------

It works on all browsers [that support the canvas element](http://caniuse.com/#feat=canvas).

Creation of JPEGs should work on all browsers except for Internet Explorer, due to spotty Data URI support.


What do I need to use it?
-------------------------

Nothing! It's completely self-contained, and released under the MIT license.


Demo
----

See a demo [here](http://sigusrone.com/misc/alphajpeg).
