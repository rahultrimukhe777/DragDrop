# Script to enable app catalog at site collection level
Connect-SPOService
$site = Get-SPOSite https://rptdev.sharepoint.com/sites/SRT
Add-SPOSiteCollectionAppCatalog -Site $site