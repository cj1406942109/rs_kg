<?php
// http://www.easyrdf.org
require 'vendor/autoload.php';

// $foaf = new EasyRdf_Graph("http://njh.me/foaf.rdf");
// $foaf->load();
// $me = $foaf->primaryTopic();
// echo "My name is: ".$me->get('foaf:name')."\n";


// Parse the input
$graph = new EasyRdf_Graph();
$rowdata = '<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.object.type>	<http://rdf.freebase.com/ns/type.property>	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.object.name>	"footballdb ID"@en	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.unique>	"true"	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.expected_type>	<http://rdf.freebase.com/ns/type.enumeration>	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#label>	"footballdb ID"@en	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.schema>	<http://rdf.freebase.com/ns/american_football.football_player>	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#FunctionalProperty>	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#domain>	<http://rdf.freebase.com/ns/american_football.football_player>	.
<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#range>	<http://rdf.freebase.com/ns/type.enumeration>	.';
// $fileName = '../data/dataset';
$fileName = 'H:/KG/freebase-rdf-latest/freebase-rdf-latest';

// $graph->parse($rowdata, 'ntriples');
$graph->parseFile($fileName, 'ntriples');
// parseFile 内存不够用，考虑文件逐行读取

// Serialise to the new output format
$output = $graph->serialise('rdfxml');

if (!is_scalar($output)) {
    $output = var_export($output, true);
}
// Send the output back to the client
// if (isset($_REQUEST['raw'])) {
//     header('Content-Type: '.$format->getDefaultMimeType());
//     print $output;
// } else {
//     print '<pre>'.htmlspecialchars($output).'</pre>';
// }
echo $output;
