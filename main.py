# main.py
# برنامه برای نمایش مقدمه و 34 بیت بخش 1

def read_file(filename):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
        return content
    except FileNotFoundError:
        return f"فایل {filename} پیدا نشد!"

def main():
    # 1. نمایش مقدمه
    moghaddame = read_file("moghaddame.txt")
    print("=== مقدمه ===\n")
    print(moghaddame)
    print("\n===================\n")

    # 2. نمایش 34 بیت بخش 1
    verses = read_file("verses_001_034.txt")
    print("=== بخش 1: بیت 1 تا 34 ===\n")
    print(verses)
    print("\n===================\n")

if __name__ == "__main__":
    main()
