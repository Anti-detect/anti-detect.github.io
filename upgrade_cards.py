import os
import glob

def upgrade_cards(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip index.html
    if 'index.html' in filepath:
        return False

    original = content

    # Add glass-card to plan articles
    content = content.replace('<article class="plan">', '<article class="plan glass-card" style="padding: 2rem;">')
    content = content.replace('<article class="plan glass-card">', '<article class="plan glass-card" style="padding: 2rem;">')

    # Remove extra tags that might be duplicated by accident
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for file in glob.glob("*.html"):
        if upgrade_cards(file):
            print(f"Upgraded cards in {file}")
            count += 1
    print(f"Total files upgraded: {count}")
