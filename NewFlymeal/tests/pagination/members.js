/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts){
    opts = jQuery.extend({
        items_per_page:10,
        num_display_entries:10,
        current_page:0,
        num_edge_entries:0,
        link_to:"#",
        prev_text:"Prev",
        next_text:"Next",
        ellipse_text:"...",
        prev_show_always:true,
        next_show_always:true,
        callback:function(){return false;}
    },opts||{});

    return this.each(function() {
        /**
         * Calculate the maximum number of pages
         */
        function numPages() {
            return Math.ceil(maxentries/opts.items_per_page);
        }

        /**
         * Calculate start and end point of pagination links depending on
         * current_page and num_display_entries.
         * @return {Array}
         */
        function getInterval()  {
            var ne_half = Math.ceil(opts.num_display_entries/2);
            var np = numPages();
            var upper_limit = np-opts.num_display_entries;
            var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
            var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
            return [start,end];
        }

        /**
         * This is the event handling function for the pagination links.
         * @param {int} page_id The new page number
         */
        function pageSelected(page_id, evt){
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        /**
         * This function inserts the pagination links into the container element
         */
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // This helper function returns a handler function that calls pageSelected with the right page_id
            var getClickHandler = function(page_id) {
                return function(evt){ return pageSelected(page_id,evt); }
            }
            // Helper function for generating a single link (or a span tag if it's the current page)
            var appendItem = function(page_id, appendopts){
                page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
                appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
                if(page_id == current_page){
                    var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
                }
                else
                {
                    var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
                        .bind("click", getClickHandler(page_id))
                        .attr('href', opts.link_to.replace(/__id__/,page_id));


                }
                if(appendopts.classes){lnk.addClass(appendopts.classes);}
                panel.append(lnk);
            }
            // Generate "Previous"-Link
            if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
            }
            // Generate starting points
            if (interval[0] > 0 && opts.num_edge_entries > 0)
            {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for(var i=0; i<end; i++) {
                    appendItem(i);
                }
                if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
                {
                    jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
            }
            // Generate interval links
            for(var i=interval[0]; i<interval[1]; i++) {
                appendItem(i);
            }
            // Generate ending points
            if (interval[1] < np && opts.num_edge_entries > 0)
            {
                if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
                {
                    jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
                var begin = Math.max(np-opts.num_edge_entries, interval[1]);
                for(var i=begin; i<np; i++) {
                    appendItem(i);
                }

            }
            // Generate "Next"-Link
            if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                appendItem(current_page+1,{text:opts.next_text, classes:"next"});
            }
        }

        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0)?1:maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = jQuery(this);
        // Attach control functions to the DOM element
        this.selectPage = function(page_id){ pageSelected(page_id);}
        this.prevPage = function(){
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function(){
            if(current_page < numPages()-1) {
                pageSelected(current_page+1);
                return true;
            }
            else {
                return false;
            }
        }
        // When all initialisation is done, draw the links
        drawLinks();
        // call callback function
        opts.callback(current_page, this);
    });
}





















// Taken from the Wikipedia page http://en.wikipedia.org/wiki/List_of_former_members_of_the_United_States_House_of_Representatives_(A)
var members = [
    ['Fred G. Aandahl', '1951-1953', 'North Dakota', 'Republican', '1897-1966'],
    ['Watkins Moorman Abbitt', '1948-1973', 'Virginia', 'Democratic', '1908-1998'],
    ['Amos Abbott', '1843-1849', 'Massachusetts', 'Whig', '1786-1868'],
    ['Jo Abbott', '1887-1897', 'Texas', 'Democratic', '1840-1908'],
    ['Joel Abbott', '1817-1825', 'Georgia', 'Democratic-Republican', '1776-1826'],
    ['Josiah Gardner Abbott', '1876-1877', 'Massachusetts', 'Democratic', '1841-1891'],
    ['Nehemiah Abbott', '1857-1859', 'Maine', 'Republican', '1804-1877'],
    ['James Abdnor', '1973-1981', 'South Dakota', 'Republican', '1923-'],
    ['Pete Abele', '1963-1965', 'Ohio', 'Republican', '1916-2000'],
    ['James Abercrombie', '1851-1855', 'Alabama', 'Whig', '1795-1861'],
    ['John Abercrombie', '1913-1917', 'Alabama', 'Democratic', '1866-1940'],
    ['Charles Laban Abernethy', '1922-1935', 'North Carolina', 'Democratic', '1872-1955'],
    ['Thomas Abernethy', '1943-1973', 'Mississippi', 'Democratic', '1903-1998'],
    ['James Abourezk', '1971-1973', 'South Dakota', 'Democratic', '1931-'],
    ['Bella Abzug', '1971-1977', 'New York', 'Democratic', '1920-1998'],
    ['An铆bal Acevedo Vil谩', '2001-2005', 'Puerto Rico', 'Democratic', '1962-'],
    ['Ernest F. Acheson', '1895-1909', 'Pennsylvania', 'Republican', '1855-1917'],
    ['Ephraim Leister Acker', '1871-1873', 'Pennsylvania', 'Democratic', '1827-1903'],
    ['Ernest R. Ackerman', '1919-1931', 'New Jersey', 'Republican', '1863-1931'],
    ['Joseph H. Acklen', '1878-1881', 'Louisiana', 'Democratic', '1850-1938'],
    ['E. Ross Adair', '1951-1971', 'Indiana', 'Republican', '1907-1983'],
    ['J. Leroy Adair', '1933-1937', 'Illinois', 'Democratic', '1887-1956'],
    ['John Adair', '1831-1833', 'Kentucky', 'Democratic', '1757-1840'],
    ['John A. M. Adair', '1907-1917', 'Indiana', 'Democratic', '1864-1938'],
    ['Benjamin Adams', '1816-1821', 'Massachusetts', 'Federalist', '1764-1837'],
    ['Brock Adams', '1965-1977', 'Washington', 'Democratic', '1927-2004'],
    ['Charles H. Adams', '1875-1877', 'New York', 'Republican', '1824-1902'],
    ['Charles Francis Adams, Sr.', '1859-1861', 'Massachusetts', 'Republican', '1807-1886'],
    ['George E. Adams', '1883-1891', 'Illinois', 'Republican', '1840-1917'],
    ['George Madison Adams', '1867-1875', 'Kentucky', 'Democratic', '1837-1920'],
    ['Green Adams', '1847-1849', 'Kentucky', 'Whig', '1812-1884'],
    ['Henry Cullen Adams', '1903-1906', 'Wisconsin', 'Republican', '1850-1906'],
    ['John Adams', '1815', 'New York', 'Democratic-Republican', '1778-1854'],
    ['John J. Adams', '1883-1887', 'New York', 'Democratic', '1848-1919'],
    ['John Quincy Adams', '1831-1834', 'Massachusetts', 'National Republican', '1767-1848'],
    ['Parmenio Adams', '1824-1825', 'New York', 'Democratic-Republican', '1776-1832'],
    ['Robert Adams, Jr.', '1893-1906', 'Pennsylvania', 'Republican', '1849-1906'],
    ['Sherman Adams', '1945-1947', 'New Hampshire', 'Republican', '1899-1986'],
    ['Silas Adams', '1893-1895', 'Kentucky', 'Republican', '1839-1896'],
    ['Stephen Adams', '1845-1847', 'Mississippi', 'Democratic', '1807-1857'],
    ['Wilbur L. Adams', '1933-1935', 'Delaware', 'Democratic', '1884-1937'],
    ['William C. Adamson', '1897-1917', 'Georgia', 'Democratic', '1854-1929'],
    ['Joseph Patrick Addabbo', '1961-1986', 'New York', 'Democratic', '1925-1986'],
    ['William Addams', '1825-1829', 'Pennsylvania', 'Democratic', '1777-1858'],
    ['Hugh Joseph Addonizio', '1949-1962', 'New Jersey', 'Democratic', '1914-1981'],
    ['Asa Adgate', '1815-1817', 'New York', 'Democratic-Republican', '1767-1832'],
    ['Charles Adkins', '1925-1933', 'Illinois', 'Republican', '1863-1941'],
    ['Garnett Adrain', '1857-1859', 'New Jersey', 'Democratic', '1815-1878'],
    ['John Alexander Ahl', '1857-1859', 'Pennsylvania', 'Democratic', '1813-1882'],
    ['D. Wyatt Aiken', '1877-1887', 'South Carolina', 'Democratic', '1828-1887'],
    ['William Aiken', '1851-1857', 'South Carolina', 'Democratic', '1779-1831'],
    ['Wyatt Aiken', '1903-1917', 'South Carolina', 'Democratic', '1863-1923'],
    ['William D.B. Ainey', '1911-1915', 'Pennsylvania', 'Republican', '1864-1932'],
    ['Lucien Lester Ainsworth', '1875-1877', 'Iowa', 'Democratic', '1831-1902'],
    ['David D. Aitken', '1893-1897', 'Michigan', 'Republican', '1853-1930'],
    ['Daniel Akaka', '1977-1990', 'Hawaii', 'Democratic', '1924-'],
    ['Thomas Peter Akers', '1856-1857', 'Missouri', 'American', '1828-1887'],
    ['Theron Akin', '1911-1913', 'New York', 'Progressive Republican', '1855-1933'],
    ['Walter H. Albaugh', '1938-1939', 'Ohio', 'Republican', '1890-1942'],
    ['Carl Albert', '1947-1977', 'Oklahoma', 'Democratic', '1908-2000'],
    ['William Albert', '1873-1875', 'Maryland', 'Republican', '1816-1879'],
    ['Nathaniel Albertson', '1849-1851', 'Indiana', 'Democratic', '1800-1863'],
    ['Donald J. Albosta', '1979-1985', 'Michigan', 'Democratic', '1925-'],
    ['Charles Albright', '1873-1875', 'Pennsylvania', 'Republican', '1830-1880'],
    ['Charles J. Albright', '1855-1857', 'Ohio', 'Oppositionist', '1816-1883'],
    ['John D. Alderson', '1889-1895', 'West Virginia', 'Democratic', '1854-1910'],
    ['Cyrus Aldrich', '1859-1863', 'Minnesota', 'Republican', '1808-1871'],
    ['J. Frank Aldrich', '1893-1897', 'Illinois', 'Republican', '1853-1933'],
    ['Nelson W. Aldrich', '1879-1881', 'Rhode Island', 'Republican', '1841-1915'],
    ['Richard S. Aldrich', '1923-1933', 'Rhode Island', 'Republican', '1884-1941'],
    ['Truman H. Aldrich', '1896-1897', 'Alabama', 'Republican', '1848-1932'],
    ['William Aldrich', '1877-1883', 'Illinois', 'Republican', '1820-1885'],
    ['William F. Aldrich', '1896-1897 1898-1899 1900-1901', 'Alabama', 'Republican', '1853-1925'],
    ['Arthur W. Aleshire', '1937-1939', 'Ohio', 'Democratic', '1900-1940'],
    ['Adam Rankin Alexander', '1823-1825', 'Tennessee', 'Democratic-Republican', '1787-1848'],
    ['Armstead M. Alexander', '1883-1885', 'Missouri', 'Democratic', '1834-1892'],
    ['Bill Alexander', '1969-1993', 'Arkansas', 'Democratic', '1934-'],
    ['De Alva S. Alexander', '1897-1911', 'New York', 'Republican', '1845-1925'],
    ['Evan Shelby Alexander', '1806-1809', 'North Carolina', 'Democratic-Republican', 'c. 1767-1809'],
    ['Henry P. Alexander', '1849-1851', 'New York', 'Whig', '1801-1867'],
    ['Hugh Quincy Alexander', '1953-1963', 'North Carolina', 'Democratic', '1911-1989'],
    ['James Alexander, Jr.', '1837-1839', 'Ohio', 'Whig', '1789-1846'],
    ['John Alexander', '1813-1817', 'Ohio', 'Democratic-Republican', '1777-1848'],
    ['John G. Alexander', '1939-1941', 'Minnesota', 'Republican', '1893-1971'],
    ['Joshua W. Alexander', '1907-1919', 'Missouri', 'Democratic', '1852-1936'],
    ['Mark Alexander', '1819-1825', 'Virginia', 'Democratic-Republican', '1792-1883'],
    ['Nathaniel Alexander', '1803-1805', 'North Carolina', 'Democratic-Republican', '1756-1808'],
    ['Sydenham Benoni Alexander', '1891-1895', 'North Carolina', 'Democratic', '1841-1920'],
    ['Dale Alford', '1959-1961', 'Arkansas', 'Independent Democrat', '1916-2000'],
    ['Julius Caesar Alford', '1837', 'Georgia', 'National Republican', '1799-1863'],
    ['Bruce Alger', '1955-1965', 'Texas', 'Republican', '1918-'],
    ['Chilton Allan', '1831-1835', 'Kentucky', 'National Republican', '1786-1858'],
    ['Wayne Allard', '1991-1997', 'Colorado', 'Republican', '1943-'],
    ['A. Leonard Allen', '1937-1953', 'Louisiana', 'Democratic', '1891-1969'],
    ['Alfred G. Allen', '1911-1917', 'Ohio', 'Democratic', '1867-1932'],
    ['Amos L. Allen', '1899-1911', 'Maine', 'Republican', '1837-1911'],
    ['Charles Allen', '1849-1853', 'Massachusetts', 'Free Soiler', '1797-1869'],
    ['Charles Herbert Allen', '1885-1889', 'Massachusetts', 'Republican', '1848-1934'],
    ['Clarence Emir Allen', '1896-1897', 'Utah', 'Republican', '1852-1932'],
    ['Clifford Allen', '1975-1978', 'Tennessee', 'Democratic', '1912-1978'],
    ['Edward P. Allen', '1887-1891', 'Michigan', 'Republican', '1839-1909'],
    ['Elisha Hunt Allen', '1841-1843', 'Maine', 'Whig', '1804-1883'],
    ['George Allen', '1991-1993', 'Virginia', 'Republican', '1952-'],
    ['Heman Allen', '1817-1818', 'Vermont', 'Democratic-Republican', '1779-1852'],
    ['Heman Allen', '1831-1837', 'Vermont', 'National Republican', '1777-1844'],
    ['Henry C. Allen', '1905-1907', 'New Jersey', 'Republican', '1872-1942'],
    ['Henry Dixon Allen', '1899-1903', 'Kentucky', 'Democratic', '1854-1924'],
    ['James C. Allen', '1853-1856 1856-1857 1863-1865', 'Illinois', 'Democratic', '1822-1912'],
    ['John Allen', '1797-1799', 'Connecticut', 'Federalist', '1763-1812'],
    ['John Clayton Allen', '1925-1933', 'Illinois', 'Republican', '1860-1939'],
    ['John J. Allen', '1833-1835', 'Virginia', 'National Republican', '1797-1871'],
    ['John J. Allen, Jr.', '1947-1959', 'California', 'Republican', '1899-1995'],
    ['John Mills Allen', '1885-1901', 'Mississippi', 'Democratic', '1846-1917'],
    ['John W. Allen', '1837-1841', 'Ohio', 'Whig', '1802-1887'],
    ['Joseph Allen', '1810-1811', 'Massachusetts', 'Federalist', '1749-1827'],
    ['Judson Allen', '1839-1841', 'New York', 'Democratic', '1797-1880'],
    ['Leo E. Allen', '1933-1961', 'Illinois', 'Republican', '1898-1973'],
    ['Nathaniel Allen', '1819-1821', 'New York', 'Democratic-Republican', '1780-1832'],
    ['Robert Allen', '1819-1825', 'Tennessee', 'Democratic-Republican', '1778-1844'],
    ['Robert Allen', '1827-1833', 'Virginia', 'Democratic', '1794-1859'],
    ['Robert E. Lee Allen', '1923-1925', 'West Virginia', 'Democratic', '1865-1951'],
    ['Robert G. Allen', '1937-1941', 'Pennsylvania', 'Democratic', '1902-1963'],
    ['Samuel Clesson Allen', '1817-1825', 'Massachusetts', 'Federalist', '1772-1842'],
    ['Thomas Allen', '1881-1882', 'Missouri', 'Democratic', '1813-1882'],
    ['Tom Allen', '1997-2009', 'Maine', 'Democratic', '1945-'],
    ['William Allen', '1833-1835', 'Ohio', 'Democratic', '1803-1879'],
    ['William Allen', '1859-1863', 'Ohio', 'Democratic', '1827-1881'],
    ['William F. Allen', '1937-1939', 'Delaware', 'Democratic', '1883-1946'],
    ['William J. Allen', '1862-1865', 'Illinois', 'Democratic', '1829-1901'],
    ['Willis Allen', '1851-1855', 'Illinois', 'Democratic', '1806-1859'],
    ['John B. Alley', '1859-1867', 'Massachusetts', 'Republican', '1817-1896'],
    ['Miles C. Allgood', '1923-1935', 'Alabama', 'Democratic', '1878-1977'],
    ['James Allison, Jr.', '1823-1825', 'Pennsylvania', 'Democratic-Republican', '1772-1854'],
    ['John Allison', '1851-1853', 'Pennsylvania', 'Whig', '1812-1878'],
    ['Robert Allison', '1831-1833', 'Pennsylvania', 'Anti-Masonic', '1777-1840'],
    ['William B. Allison', '1863-1871', 'Iowa', 'Republican', '1829-1908'],
    ['Edward B. Almon', '1915-1933', 'Alabama', 'Democratic', '1860-1933'],
    ['J. Lindsay Almond, Jr.', '1946-1948', 'Virginia', 'Democratic', '1898-1986'],
    ['Lemuel J. Alston', '1807-1811', 'South Carolina', 'Democratic-Republican', '1760-1836'],
    ['William J. Alston', '1849-1851', 'Alabama', 'Whig', '1800-1876'],
    ['Willis Alston', '1799-1815', 'North Carolina', 'Democratic-Republican', '1769-1837'],
    ['James C. Alvord', '1839', 'Massachusetts', 'Whig', '1808-1839'],
    ['Jacob A. Ambler', '1869-1873', 'Ohio', 'Republican', '1829-1906'],
    ['Jerome Ambro', '1975-1981', 'New York', 'Democratic', '1928-1993'],
    ['Lemuel Amerman', '1891-1893', 'Pennsylvania', 'Democratic', '1846-1897'],
    ['Butler Ames', '1903-1913', 'Massachusetts', 'Republican', '1871-1954'],
    ['Fisher Ames', '1789-1795', 'Massachusetts', 'Pro-Administration', '1758-1808'],
    ['Oakes Ames', '1863-1873', 'Massachusetts', 'Republican', '1804-1873'],
    ['Thomas Ryum Amlie', '1931-1933', 'Wisconsin', 'Republican', '1897-1973'],
    ['Joseph S. Ammerman', '1977-1979', 'Pennsylvania', 'Democratic', '1924-1993'],
    ['Sydenham Elnathan Ancona', '1861-1867', 'Pennsylvania', 'Democratic', '1824-1913'],
    ['Herman Carl Andersen', '1939-1963', 'Minnesota', 'Republican', '1897-1978'],
    ['Albert R. Anderson', '1887-1889', 'Iowa', 'Independent Republican', '1837-1898'],
    ['Carl C. Anderson', '1909-1912', 'Ohio', 'Democratic', '1877-1912'],
    ['Chapman L. Anderson', '1887-1891', 'Mississippi', 'Democratic', '1845-1924'],
    ['Charles Arthur Anderson', '1937-1941', 'Missouri', 'Democratic', '1892-1977'],
    ['Charles Marley Anderson', '1885-1887', 'Ohio', 'Democratic', '1845-1908'],
    ['Clinton Presba Anderson', '1941-1945', 'New Mexico', 'Democratic', '1895-1975'],
    ['George A. Anderson', '1887-1889', 'Illinois', 'Democratic', '1853-1896'],
    ['George Washington Anderson', '1865-1869', 'Missouri', 'Republican', '1832-1902'],
    ['Glenn M. Anderson', '1969-1993', 'California', 'Democratic', '1913-1994'],
    ['Hugh J. Anderson', '1837-1841', 'Maine', 'Democratic', '1801-1881'],
    ['Isaac Anderson', '1803-1807', 'Pennsylvania', 'Democratic-Republican', '1760-1838'],
    ['Jack Z. Anderson', '1939-1953', 'California', 'Republican', '1904-1981'],
    ['John Anderson', '1825-1833', 'Maine', 'Democratic', '1792-1853'],
    ['John Alexander Anderson', '1879-1887', 'Kansas', 'Republican', '1834-1892'],
    ['John B. Anderson', '1961-1981', 'Illinois', 'Republican', '1922-'],
    ['Joseph H. Anderson', '1843-1847', 'New York', 'Democratic', '1800-1870'],
    ['Josiah M. Anderson', '1849-1851', 'Tennessee', 'Whig', '1807-1861'],
    ['LeRoy H. Anderson', '1957-1961', 'Montana', 'Democratic', '1906-1991'],
    ['Lucien Anderson', '1863-1865', 'Kentucky', 'Unconditional Unionist', '1824-1898'],
    ['Richard Clough Anderson, Jr.', '1817-1821', 'Kentucky', 'Democratic-Republican', '1788-1826'],
    ['Samuel Anderson', '1827-1829', 'Pennsylvania', 'National Republican', '1773-1850'],
    ['Simeon H. Anderson', '1839-1840', 'Kentucky', 'Whig', '1802-1840'],
    ['Sydney Anderson', '1911-1925', 'Minnesota', 'Republican', '1881-1948'],
    ['Thomas Lilbourne Anderson', '1857-1859', 'Missouri', 'American', '1808-1885'],
    ['William Anderson', '1809-1815 1817-1819', 'Pennsylvania', 'Democratic-Republican', '1762-1829'],
    ['William B. Anderson', '1875-1877', 'Illinois', 'Independent', '1830-1901'],
    ['William Clayton Anderson', '1859-1861', 'Kentucky', 'Oppositionist', '1826-1861'],
    ['William Coleman Anderson', '1895-1897', 'Tennessee', 'Republican', '1853-1902'],
    ['William R. Anderson', '1965-1973', 'Tennessee', 'Democratic', '1921-2007'],
    ['August H. Andresen', '1925-1933 1935-1958', 'Minnesota', 'Republican', '1890-1958'],
    ['Abram Andrew', '1921-1936', 'Massachusetts', 'Republican', '1873-1936'],
    ['John F. Andrew', '1889-1893', 'Massachusetts', 'Democratic', '1853-1895'],
    ['Charles Andrews', '1851-1852', 'Maine', 'Democratic', '1814-1852'],
    ['Elizabeth B. Andrews', '1972-1973', 'Alabama', 'Democratic', '1911-2002'],
    ['George R. Andrews', '1849-1851', 'New York', 'Whig', '1808-1873'],
    ['George W. Andrews', '1944-1971', 'Alabama', 'Democratic', '1906-1971'],
    ['Glenn Andrews', '1965-1967', 'Alabama', 'Republican', '1909-2008'],
    ['Ike Franklin Andrews', '1973-1985', 'North Carolina', 'Democratic', '1925-'],
    ['John T. Andrews', '1837-1839', 'New York', 'Democratic', '1803-1894'],
    ['Landaff Andrews', '1839-1843', 'Kentucky', 'Whig', '1803-1887'],
    ['Mark Andrews', '1963-1981', 'North Dakota', 'Republican', '1926-'],
    ['Michael A. Andrews', '1983-1995', 'Texas', 'Democratic', '1944-'],
    ['Samuel George Andrews', '1857-1859', 'New York', 'Republican', '1796-1863'],
    ['Sherlock James Andrews', '1841-1843', 'Ohio', 'Whig', '1801-1880'],
    ['Thomas H. Andrews', '1991-1995', 'Maine', 'Democratic', '1953-'],
    ['Walter G. Andrews', '1931-1949', 'New York', 'Republican', '1889-1949'],
    ['William E. Andrews', '1895-1897 1919-1923', 'Nebraska', 'Republican', '1854-1942'],
    ['William Noble Andrews', '1919-1921', 'Maryland', 'Republican', '1876-1937'],
    ['John Emory Andrus', '1905-1913', 'New York', 'Republican', '1841-1934'],
    ['Victor Anfuso', '1951-1953 1955-1963', 'New York', 'Democratic', '1905-1966'],
    ['William G. Angel', '1825-1827', 'New York', 'National Republican', '1790-1858'],
    ['Homer D. Angell', '1939-1955', 'Oregon', 'Republican', '1875-1968'],
    ['Frank Annunzio', '1965-1993', 'Illinois', 'Democratic', '1915-2001'],
    ['Timothy T. Ansberry', '1907-1915', 'Ohio', 'Democratic', '1871-1943'],
    ['Martin C. Ansorge', '1921-1923', 'New York', 'Republican', '1882-1967'],
    ['Beryl Anthony, Jr.', '1979-1993', 'Arkansas', 'Democratic', '1938-'],
    ['Daniel Read Anthony, Jr.', '1907-1929', 'Kansas', 'Republican', '1870-1931'],
    ['Joseph Biles Anthony', '1833-1837', 'Pennsylvania', 'Democratic', '1795-1891'],
    ['Edwin Le Roy Antony', '1892-1893', 'Texas', 'Democratic', '1852-1913'],
    ['Henry H. Aplin', '1901-1903', 'Michigan', 'Republican', '1841-1910'],
    ['Stewart H. Appleby', '1925-1927', 'New Jersey', 'Republican', '1890-1964'],
    ['T. Frank Appleby', '1921-1923', 'New Jersey', 'Republican', '1864-1924'],
    ['Douglas Applegate', '1977-1995', 'Ohio', 'Democratic', '1928-'],
    ['John Appleton', '1851-1853', 'Maine', 'Democratic', '1815-1864'],
    ['Nathan Appleton', '1831-1833', 'Massachusetts', 'National Republican', '1779-1861'],
    ['William Appleton', '1851-1855', 'Massachusetts', 'Whig', '1786-1862'],
    ['Lewis D. Apsley', '1893-1897', 'Massachusetts', 'Republican', '1852-1925'],
    ['Bill Archer', '1971-2001', 'Texas', 'Republican', '1928-'],
    ['John Archer', '1801-1807', 'Maryland', 'Democratic-Republican', '1741-1810'],
    ['Stevenson Archer', '1811-1817 1819-1821', 'Maryland', 'Democratic-Republican', '1786-1848'],
    ['Stevenson Archer', '1867-1875', 'Maryland', 'Democratic', '1827-1898'],
    ['William S. Archer', '1820-1825', 'Virginia', 'Democratic-Republican', '1789-1855'],
    ['Leslie Cornelius Arends', '1935-1974', 'Illinois', 'Republican', '1895-1985'],
    ['Henry M. Arens', '1933-1935', 'Minnesota', 'Farmer-Labor', '1873-1963'],
    ['Samuel S. Arentz', '1921-1923 1925-1933', 'Nevada', 'Republican', '1879-1934'],
    ['Dick Armey', '1985-2003', 'Texas', 'Republican', '1940-'],
    ['Robert Franklin Armfield', '1879-1883', 'North Carolina', 'Democratic', '1829-1898'],
    ['James Armstrong', '1793-1795', 'Pennsylvania', 'Pro-Administration', '1748-1828'],
    ['Orland K. Armstrong', '1951-1953', 'Missouri', 'Republican', '1893-1987'],
    ['William Armstrong', '1825-1833', 'Virginia', 'National Republican', '1782-1865'],
    ['William Hepburn Armstrong', '1869-1871', 'Pennsylvania', 'Republican', '1824-1919'],
    ['William L. Armstrong', '1973-1979', 'Colorado', 'Republican', '1937-'],
    ['Samuel Mayes Arnell', '1866-1867', 'Tennessee', 'Unionist', '1833-1903'],
    ['Benedict Arnold', '1829-1831', 'New York', 'National Republican', '1780-1849'],
    ['Isaac N. Arnold', '1861-1865', 'Illinois', 'Republican', '1815-1884'],
    ['Laurence F. Arnold', '1937-1943', 'Illinois', 'Democratic', '1891-1966'],
    ['Lemuel H. Arnold', '1845-1847', 'Rhode Island', 'Whig', '1792-1852'],
    ['Marshall Arnold', '1891-1895', 'Missouri', 'Democratic', '1845-1913'],
    ['Samuel Arnold', '1857-1859', 'Connecticut', 'Democratic', '1806-1869'],
    ['Samuel W. Arnold', '1943-1949', 'Missouri', 'Republican', '1879-1961'],
    ['Thomas Dickens Arnold', '1831-1833', 'Tennessee', 'National Republican', '1798-1870'],
    ['Warren O. Arnold', '1887-1891 1895-1897', 'Rhode Island', 'Republican', '1839-1910'],
    ['William Carlile Arnold', '1895-1899', 'Pennsylvania', 'Republican', '1851-1906'],
    ['William W. Arnold', '1923-1935', 'Illinois', 'Democratic', '1877-1957'],
    ['John Arnot, Jr.', '1883-1886', 'New York', 'Democratic', '1831-1886'],
    ['Archibald Hunter Arrington', '1841-1845', 'North Carolina', 'Democratic', '1809-1872'],
    ['William Evans Arthur', '1871-1875', 'Kentucky', 'Democratic', '1825-1897'],
    ['Michael Woolston Ash', '1835-1837', 'Pennsylvania', 'Democratic', '1789-1858'],
    ['Jean Spencer Ashbrook', '1982-1983', 'Ohio', 'Republican', '1934-'],
    ['John M. Ashbrook', '1961-1982', 'Ohio', 'Republican', '1928-1982'],
    ['William A. Ashbrook', '1907-1921 1935-1940', 'Ohio', 'Democratic', '1867-1940'],
    ['John B. Ashe', '1790-1793', 'North Carolina', 'Anti-Administration', '1748-1802'],
    ['John B. Ashe', '1843-1845', 'Tennessee', 'Whig', '1810-1857'],
    ['Thomas Samuel Ashe', '1873-1877', 'North Carolina', 'Democratic', '1812-1887'],
    ['William Shepperd Ashe', '1849-1855', 'North Carolina', 'Democratic', '1814-1862'],
    ['Delos R. Ashley', '1865-1869', 'Nevada', 'Republican', '1828-1873'],
    ['Henry Ashley', '1825-1827', 'New York', 'Democratic', '1778-1829'],
    ['James Mitchell Ashley', '1859-1869', 'Ohio', 'Republican', '1824-1896'],
    ['Thomas W. L. Ashley', '1955-1981', 'Ohio', 'Democratic', '1923-'],
    ['William Henry Ashley', '1831-1837', 'Missouri', 'Democratic', '1778-1838'],
    ['John D. Ashmore', '1859-1860', 'South Carolina', 'Democratic', '1819-1871'],
    ['Robert T. Ashmore', '1953-1969', 'South Carolina', 'Democratic', '1904-1989'],
    ['George Ashmun', '1845-1851', 'Massachusetts', 'Whig', '1804-1870'],
    ['Joel Funk Asper', '1869-1871', 'Missouri', 'Republican', '1822-1872'],
    ['Les Aspin', '1971-1993', 'Wisconsin', 'Democratic', '1938-1995'],
    ['Wayne N. Aspinall', '1949-1973', 'Colorado', 'Democratic', '1896-1983'],
    ['James Benjamin Aswell', '1913-1931', 'Louisiana', 'Democratic', '1869-1931'],
    ['Charles G. Atherton', '1837-1843', 'New Hampshire', 'Democratic', '1804-1853'],
    ['Charles Humphrey Atherton', '1815-1817', 'New Hampshire', 'Federalist', '1773-1853'],
    ['Gibson Atherton', '1879-1883', 'Ohio', 'Democratic', '1831-1887'],
    ['William O. Atkeson', '1921-1923', 'Missouri', 'Republican', '1854-1931'],
    ['Chester G. Atkins', '1985-1993', 'Massachusetts', 'Democratic', '1948-'],
    ['John DeWitt Clinton Atkins', '1857-1859 1873-1883', 'Tennessee', 'Democratic', '1825-1908'],
    ['Archibald Atkinson', '1843-1849', 'Virginia', 'Democratic', '1792-1872'],
    ['Eugene Atkinson', '1979-1981', 'Pennsylvania', 'Democratic', '1927-'],
    ['George W. Atkinson', '1890-1891', 'West Virginia', 'Republican', '1845-1925'],
    ['Louis E. Atkinson', '1883-1893', 'Pennsylvania', 'Republican', '1841-1910'],
    ['Richard Merrill Atkinson', '1937-1939', 'Tennessee', 'Democratic', '1894-1947'],
    ['John Wilbur Atwater', '1899-1901', 'North Carolina', 'Independent Populist', '1840-1910'],
    ['David Atwood', '1870-1871', 'Wisconsin', 'Republican', '1815-1889'],
    ['Harrison H. Atwood', '1895-1897', 'Massachusetts', 'Republican', '1863-1954'],
    ['James C. Auchincloss', '1943-1965', 'New Jersey', 'Republican', '1885-1976'],
    ['Les AuCoin', '1975-1993', 'Oregon', 'Democratic', '1942-'],
    ['Oscar L. Auf der Heide', '1925-1935', 'New Jersey', 'Democratic', '1874-1945'],
    ['Albert E. Austin', '1939-1941', 'Connecticut', 'Republican', '1877-1942'],
    ['Archibald Austin', '1817-1819', 'Virginia', 'Democratic-Republican', '1772-1837'],
    ['Richard W. Austin', '1909-1919', 'Tennessee', 'Republican', '1857-1919'],
    ['Thomas H. Averett', '1849-1853', 'Virginia', 'Democratic', '1800-1855'],
    ['John T. Averill', '1871-1875', 'Minnesota', 'Republican', '1825-1889'],
    ['Daniel Avery', '1811-1815 1816-1817', 'New York', 'Democratic-Republican', '1766-1842'],
    ['John Avery', '1893-1897', 'Michigan', 'Republican', '1824-1914'],
    ['William H. Avery', '1955-1964', 'Kansas', 'Republican', '1911-'],
    ['William T. Avery', '1857-1861', 'Tennessee', 'Democratic', '1819-1880'],
    ['Samuel B. Avis', '1913-1915', 'West Virginia', 'Republican', '1872-1924'],
    ['Samuel Beach Axtell', '1867-1871', 'California', 'Democratic', '1819-1891'],
    ['John Bancker Aycrigg鈥�', '1837-1839 1841-1843', 'New Jersey', 'Whig', '1798-1856'],
    ['Richard S. Ayer', '1870-1871', 'Virginia', 'Republican', '1829-1896'],
    ['Roy E. Ayers', '1933-1937', 'Montana', 'Democratic', '1882-1955'],
    ['Steven B. Ayres', '1911-1913', 'New York', 'Independent Democrat', '1861-1929'],
    ['William Augustus Ayres', '1915-1921 1923-1934', 'Kansas', 'Democratic', '1867-1952'],
    ['William Hanes Ayres', '1951-1971', 'Ohio', 'Republican', '1916-2000']
];