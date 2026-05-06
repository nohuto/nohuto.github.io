---
title: 'Encrypted DNS'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 1
---

The DNS server get's applied via registry (tracked while applying it via the settings):
```c
HKLM\System\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{NetID}\NameServer  Type: REG_SZ, Length: 24, Data: 194.242.2.5
HKLM\System\CurrentControlSet\Services\Dnscache\InterfaceSpecificParameters\{NetID}\DohInterfaceSettings\Doh\194.242.2.5\DohTemplate  Type: ad.net/dns-query
HKLM\System\CurrentControlSet\Services\Dnscache\InterfaceSpecificParameters\{NetID}\DohInterfaceSettings\Doh\194.242.2.5\DohFlags  Type: REG_QWORD, Length: 8, Data: 2
```

If you're wondering what `Family`/`Malware`/`Extended` etc. behind the provider names mean, see '[Mullvad](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls#specifications)', '[Quad9](https://docs.quad9.net/services/)', '[AdGuard](https://adguard-dns.io/kb/general/dns-providers/)', '[Cloudflare](https://developers.cloudflare.com/1.1.1.1/setup/)' for details. If you want to use NextDNS, create your own profile [here](https://my.nextdns.io/)

`DohFlags` data meaning:
- `DNS_DOH_SERVER_SETTINGS_ENABLE_AUTO (0x0001)`: If this option is present, then the DNS server that's referenced by this property will load its URI template from the system DNS-over-HTTPS system list. When this option is present, the Template field must be set to NULL. This option must not be used together with the DNS_DOH_SERVER_SETTINGS_ENABLE option.
- `DNS_DOH_SERVER_SETTINGS_ENABLE (0x0002)`: If this option is present, then the Template field must point to a valid DNS-over-HTTPS URI template. This option must not be used together with the DNS_DOH_SERVER_SETTINGS_ENABLE_AUTO option.
- `DNS_DOH_SERVER_SETTINGS_FALLBACK_TO_UDP (0x0004)`: This option indicates that the referenced server may fallback to unsecure name resolution (UDP/TCP) if the DNS-over-HTTPS query failed. This option can be used only in addition to DNS_DOH_SERVER_SETTINGS_ENABLE_AUTO or DNS_DOH_SERVER_SETTINGS_ENABLE.
- `DNS_DOH_AUTO_UPGRADE_SERVER (0x0008)`: This option allows a DNS server present in an NRPT rule to use the DNS-over-HTTPS template if it has the same IP address as the server referenced by this property. This option can't be used by itself; it must be in addition to DNS_DOH_SERVER_SETTINGS_ENABLE_AUTO or DNS_DOH_SERVER_SETTINGS_ENABLE.

`NetID` is saved in your network adapter GUID key (`{4d36e972-e325-11ce-bfc1-08002be10318}`) named `NetCfgInstanceId`.

---

| Protocol  | Explanation |
| --------- | ---- |
| Cleartext | Traditional DNS over UDP/TCP 53 with no encryption, so anyone on the path can read or alter your queries. |
| DoH/3     | DNS sent inside HTTPS using HTTP/3 on port 443, encrypting lookups and making them look like normal web traffic. |
| DoT       | DNS sent over a TLS encrypted connection on port 853, protecting queries in transit at the transport layer. |
| DoQ       | DNS carried over QUIC with built in encryption and faster handshakes, improving reliability.|
| DNSCrypt  | A non IETF protocol that encrypts and authenticates DNS between client and resolver, with more limited ecosystem support. |
| DoH       | DNS sent inside HTTPS (typically HTTP/2) on port 443, providing encrypted lookups that blend in with regular HTTPS traffic. |

## Providers Compared

| Provider | Encryption | DNSSEC | ECS | QNAME | Logging Policy | Filtering | Jurisdiction / Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Quad9](https://quad9.net/) | DoH, DoT | Yes | Off (disabled) | Yes | No logs ([no IP stored](https://quad9.net/privacy/policy)) | Malware/phishing | Switzerland (nonprofit) |
| [Mullvad DNS](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) | DoH, DoT | Yes | Off | [Yes](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) | [No logs](https://mullvad.net/en/blog/clarifying-our-no-logging-policy) | Ads/trackers (optional) | Sweden (Mullvad AB) |
| [NextDNS](https://nextdns.io/) | DoH, DoT, DoQ | Yes | Off | [Yes](https://nextdns.io/privacy) | Opt-in ([default no-logs](https://nextdns.io/privacy)) | Ads/trackers/malware | US (NextDNS Inc.) |
| [Cloudflare 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/) | DoH, DoT, DoQ | Yes | Off | Unspecified | [Minimal logs](https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/) (IP truncated, deleted <25h) | Malware/family (optional) | US (Cloudflare) |
| [AdGuard DNS](https://adguard-dns.io/) | DoH, DoT, DoQ, DNSCrypt | Yes | Unspecified | Unspecified | No personal data on public DNS | Ads/malware blocking | EU (AdGuard team) |

`Quad9/Mullvad > AdGuard > NextDNS > Cloudflare` in my option based on my findings. I wouldn't recommend to use DNS resolvers like 'Google Public DNS', just read through their privacy policies and see if they support DNSSEC/QNAME minimalisation/encrypted DNS, disable ECS (EDNS Client Subnet), and don't collect identifiable query logs (that's how I created the table above, including some other facts like Mullvad supporting anycast).

Obviously self-host a DNS resolver for the best privacy, so queries stay local.

## DNS Explained

DNS (domain name system) is the phonebook of the internet, which means that it translates domains to the corresponding IP addresses (DNS resolution). See [dnssimple comics](https://dnsimple.com/comics) for a very simple explanation.

The four types of DNS servers:  
The **recursive resolver** sends requests to the other three nameservers (root -> TLD -> authoritative), if there's no cached data. It saves the data from the authoritative nameserver so the resolver can skip the requests and send back the IP from the domain to the client. If you're not using any specific DNS server, you're using the resolver from your ISP.

The resolver firstly queries a [**root nameserver**](https://root-servers.org/), which returns the [TLD](https://www.iana.org/domains/root/db) (extension or last segment) -> e.g. `.com`, `.org`, `.net` & more. The root servers are managed by [ICANN](https://www.icann.org/resources/pages/what-2012-02-25-en). If the extension e.g. ends with `.org`, the root server would direct to the `.org` TLD nameserver.

The **TLD nameserver** includes data for domain names, it redirects to the authoritative nameserver, after the correct TLD nameserver was found. They are managed from [IANA](https://www.iana.org/domains/root/db), which splits the TLDs into two groups, generic/gTLD (sTLD and uTLD - sponsored & unsponsored, ngTLD counts as gTLD) and county code/ccTLD.

Types of TLDs:  
- **gTLD** -> Generic, common domain names like `.com`, `.org`
- **ccTLD** -> Country code TLDs, like `.us`, `.de`, `.uk` etc.
- [**sTLD**](https://icannwiki.org/index.php?title=Sponsored_Top_level_Domain#List_of_Sponsored_Top_Level_Domains) -> Sponsored by private organizations, reserved for these groups: `.mil`, `.app`, `.gov`
- [**ARPA**](https://www.iana.org/domains/arpa) -> Infrastructural TLD, only contains `.arpa`. Used for reversed DNS lookups, you won't use it
- **ngTLD** -> New gTLD, used for branding, niches, etc.: `.shop`, `.online`, `.tech`
- **Reserved TLD** -> Used for testing, they cannot be used: `.localhost`, `.example`

The **authoritative nameserver** tells the resolver the IP address, from the [A record](https://support.dnsimple.com/articles/a-record/). [Records](https://www.cloudflare.com/learning/dns/dns-records/) are included in authoritative DNS servers and contain information like the IP address, TTL value and more.

Step 9 is the HTTP request from the browser to the IP from the resolver & step 10 returns the web page (mostly HTML data). 

![](https://github.com/nohuto/win-config/blob/main/network/images/dnslookup.png?raw=true)

Some additional info about HTTP request methods you may want to know:  
`GET` & `POST` HTTP request methods are the most common ones. `GET` request awaits data (read a web page), `POST` request means that the user is sending data. There more [request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), but I won't add them here. You're able to turn off `GET` requests in the DDG search engine settings, to hide search queries in the request body (queries aren't visible in browser history or logs), which is why I added this info. You can see request in the network tab (`F12`).

## Note for iOS users

I personally use [AdGuard](https://adguard-dns.io/), since it's possible to add custom blocklists/user rules (and it supports all lists of Hagezi while [NextDNS](https://my.nextdns.io/) only supports the main ones), while [NextDNS](https://my.nextdns.io/) only provides a specific set of blocklists and doesn't allow custom rules (there're also several other reasons why I wouldn't use their private DNS at the moment, e.g.: their TIF isn’t public ([and many other ones](https://github.com/nextdns/metadata))), they didn’t solve issues which got reported months ago (), they use lists that aren’t actively maintained by default (they also don't update [obselete links](https://github.com/nextdns/blocklists/tree/main/blocklists), causing 10 empty blocklists), they don’t look into their GitHub issues (e.g. nextdns/blocklists). Use 'Configuration Profile' instead of downloading the app, you can configure the profile using the links below.
