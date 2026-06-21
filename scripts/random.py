#!/usr/bin/env python3
"""
random.py

Prints a single random integer between 1 and 100.

NOTE: This file is served as a static asset only. GitHub Pages and
Cloudflare Pages cannot execute server-side Python. The terminal's
`run scripts/random.py` command does NOT actually invoke this file,
it simulates the output in JavaScript. This script is here so you
can read real source with `cat`, and so the behavior is documented
and reproducible if you ever run it on an actual machine with Python
installed.
"""

import random


def main():
    print(random.randint(1, 100))


if __name__ == "__main__":
    main()
