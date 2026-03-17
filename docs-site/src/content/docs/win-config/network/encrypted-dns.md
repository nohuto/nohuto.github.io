---
title: 'Encrypted DNS'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#encrypted-dns'
sidebar:
  order: 1
---

The DNS server get's applied via registry (tracked while applying it via the settings):
```csv
HKLM\System\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{NetID}\NameServer  Type: REG_SZ, Length: 24, Data: 194.242.2.5
HKLM\System\CurrentControlSet\Services\Dnscache\InterfaceSpecificParameters\{NetID}\DohInterfaceSettings\Doh\194.242.2.5\DohTemplate  Type: ad.net/dns-query
HKLM\System\CurrentControlSet\Services\Dnscache\InterfaceSpecificParameters\{NetID}\DohInterfaceSettings\Doh\194.242.2.5\DohFlags  Type: REG_QWORD, Length: 8, Data: 2
```
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

> https://www.cloudflare.com/learning/dns/dns-over-tls/  
> https://www.privacyguides.org/en/advanced/dns-overview/

## Providers Compared

| Provider | Encryption | DNSSEC | ECS | QNAME | Logging Policy | Filtering | Jurisdiction / Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Quad9](https://quad9.net/) | DoH, DoT | Yes | Off (disabled) | Yes | No logs ([no IP stored](https://quad9.net/privacy/policy)) | Malware/phishing | Switzerland (nonprofit) |
| [Mullvad DNS](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) | DoH, DoT | Yes | Off | [Yes](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls) | [No logs](https://mullvad.net/en/blog/clarifying-our-no-logging-policy) | Ads/trackers (optional) | Sweden (Mullvad AB) |
| [NextDNS](https://nextdns.io/) | DoH, DoT, DoQ | Yes | Off | [Yes](https://nextdns.io/privacy) | Opt-in ([default no-logs](https://nextdns.io/privacy)) | Ads/trackers/malware | US (NextDNS Inc.) |
| [Cloudflare 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/) | DoH, DoT, DoQ | Yes | Off | Unspecified | [Minimal logs](https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/) (IP truncated, deleted <25h) | Malware/family (optional) | US (Cloudflare) |
| [AdGuard DNS](https://adguard-dns.io/) | DoH, DoT, DoQ, DNSCrypt | Yes | Unspecified | Unspecified | No personal data on public DNS | Ads/malware blocking | EU (AdGuard team) |

`Quad9/Mullvad > AdGuard > NextDNS > Cloudflare` in my option based on my findings. I wouldn't recommend to use DNS resolvers like 'Google Public DNS', just read trough their privacy policies and see if they support DNSSEC/QNAME minimalisation/encrypted DNS, disable ECS (EDNS Client Subnet), and don't collect identifiable query logs (that's how I created the table above, including some other facts like Mullvad supporting anycast).

Obviously self-host a DNS resolver for the best privacy, so queries stay local using for example pi-hole.

## DNS Explained

DNS (domain name system) is the phonebook of the internet, which means that it translates domains to the corresponding IP addresses (DNS resolution).

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

> https://www.privacyguides.org/en/dns/  
> https://dnsimple.com/comics

## Note for iOS users

I personally use AdGuard, since it's possible to add custom blocklists/user rules (and it supports all lists of Hagezi while NextDNS only supports the main ones), while NextDNS only provides a specific set of blocklists and doesn't allow custom rules. Use 'Configuration Profile' instead of downloading the app, you can configure the profile using the links below.

> https://adguard-dns.io/  
> https://my.nextdns.io/  
> https://github.com/yokoffing/NextDNS-Config
