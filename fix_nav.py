with open('frontend/index.html', 'r') as f:
    content = f.read()

old = content[content.find('<nav id="navbar">'):content.find('</nav>')+6]

new = '''<nav id="navbar">
  <a href="#" class="nav-logo">
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="20" stroke="#C9A84C" stroke-width="0.8"/>
      <path d="M21 8L24.5 16.5L34 18L27 24.5L29 34L21 30L13 34L15 24.5L8 18L17.5 16.5Z" fill="none" stroke="#C9A84C" stroke-width="0.9" stroke-linejoin="round"/>
      <circle cx="21" cy="21" r="3" fill="#C9A84C" opacity="0.6"/>
    </svg>
    <div class="nav-brand">SHAMBHU<br><span style="font-size:9px;opacity:.6;letter-spacing:2px;">DECORATION</span></div>
  </a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#process">Process</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="nav-btns" id="nav-btns">
    <button class="btn-nav-login" onclick="openAuth(\'login\')">Login</button>
    <button class="btn-nav-signup" onclick="openAuth(\'signup\')">Sign Up</button>
  </div>
  <div class="nav-user-badge" id="nav-user">
    <div class="user-avatar" id="user-initial">S</div>
    <div class="user-name" id="user-display-name">Guest</div>
    <button class="btn-logout" onclick="logout()">Logout</button>
  </div>
</nav>'''

content = content.replace(old, new)
with open('frontend/index.html', 'w') as f:
    f.write(content)
print("✅ Navbar fixed!")
