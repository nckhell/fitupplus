<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lessons')->insert(
            [
                'instructor_id' => 1,
                'title' => 'Baile Fit',
                'slug' => 'baile-fit',
                'description' => '<p>Baile Fit is een programma dat bestaat uit fitnessoefeningen en is gebaseerd is op Latijns-Amerikaanse dans (<span lang="FR-BE">&lsquo;</span><span lang="NL-BE">baile</span><span lang="FR-BE">&rsquo;</span><span lang="NL-BE"> betekent dans in het Spaans). De dansoefeningen zijn dynamisch en worden op muziek uitgevoerd.</span></p><p>Fit betekent gezond en fysiek sterk. Dankzij het dansen verbeter je dus je gezondheid.</p><p>De swingende dansoefeningen slepen je ook mee in een leuke en levendige sfeer.</p><p><u>Doelgroep</u>: iedereen kan deelnemen aan Baile Fit, van jong tot minder jong. Indien je van dansen houdt zullen de oefeningen een positief effect hebben op je gezondheid, zowel fysiek als mentaal. Je voelt je beter en geniet meer van het leven.</p>',
                'order' => 1
            ],
            [
                'instructor_id' => 1,
                'title' => 'Kinderyoga',
                'slug' => 'kinderyoga',
                'description' => '<p>Een kind ontwikkelt zich op jonge leeftijd bijzonder snel. Lichaamsbeweging is bijzonder belangrijk.</p><p>Via verschillende creatieve yoga-technieken zal je gauw ontdekken dat yoga een positieve invloed heeft op de ontwikkeling van lichaam en geest.</p><p>Kinderyoga heeft tot doel een kind te laten bewegen op een bewuste manier. Het is goed voor de ontplooiing van een evenwichtige motoriek.</p><p>Wij geven kinderen &lsquo;tools&rsquo; zoals een correcte ademhaling en een juiste lichaamshouding die hen toelaten te ontspannen.</p><p>Onze yogalessen zijn opgebouwd rond thema&rsquo;s waarbij kinderen hun eigen idee&euml;n mogen inbrengen. De kinderen genieten van speelse momenten. Op die manier krijgen ze meer zelfvertrouwen en oefenen ze hun concentratievermogen op een leuke manier. Presteren hoort hier niet thuis. Elk kind mag helemaal zichzelf zijn.</p>',
                'order' => 2
            ],
            [
                'instructor_id' => 3,
                'title' => 'Healing Yoga',
                'slug' => 'healing-yoga',
                'description' => '<p>Healing Yoga omvat alle belangrijke takken binnen Yoga. Zo wordt er gewerkt met houdingen maar ook met concentratie, meditatie, bewustwording en ademhaling. Het bewust ervaren naar wat er gebeurt op zowel lichamelijk, mentaal als emotioneel vlak.　</p><p>Healing Yoga gebruikt helende aspecten binnen verscheidene vormen van Yoga. Zo zullen zowel de helende effecten van de Ashtanga en Vinyasa Yoga aanbod komen, als de ontspannende en balansmakende Yin Yoga. Ook andere tools die leiden naar een helend effect komen aan bod.</p><p>Healing Yoga legt de nadruk op de individuele behoefte van elk persoon. Er wordt rekening gehouden met blessures en er worden aangepte opties aangeboden. Dit maakt dat de helende werking voor elk persoon aanbod komt.</p><p>Voor meer informatie kan je altijd tercht op&nbsp;<a title="Yogainfinity" href="http://www.yogainfinity.be">www.yogainfinity.be</a></p>',
                'order' => 3
            ],
            [
                'instructor_id' => 1,
                'title' => 'Tai Chi',
                'slug' => 'tai-chi',
                'description' => '<p>Recente wetenschappelijke bevindingen geven duidelijk aan dat \'chi\' of energie bestaat. Ze bevestigen de traditionele oefensystemen en wijsheden.</p><p>Tai chi oefent je lichaam&nbsp;EN geest met een soepele energiekracht. Je ontdekt ontspanning, een innerlijke kracht die je lichaam heeft en je geest helder houdt. Tai chi is een meditatie in beweging waardoor je in 1 training de voordelen van beiden ervaart. Iedereen kan het beoefenen en de voordelen belichamen.</p><p>Voor meer informatie over Tai Chi, ga naar <a href="http://www.inner-motion.be" target="_blank">www.inner-motion.be</a></p>',
                'order' => 4
            ],
            [
                'instructor_id' => 5,
                'title' => 'Indoor Cycling',
                'slug' => 'indoor-cycling',
                'description' => '<p>Indoor Cycling is een training gericht op conditie waarbij je op het tempo van de muziek fietst. Deze training doe je op een soort hometrainer die je instelt volgens je eigen weerstandsvermogen. De training is goed voor een sterk hart, het vergroten van je longinhoud, een goede bloedsomloop en soepele spieren. Klaar om een uurtje echt hard aan het werk te gaan?</p><p><u>Doelgroep</u>: elke echte fietsliefhebber die tijdens de winter geen mogelijkheid heeft om te gaan fietsen of als voorbereiding voor intensieve sportactiviteiten. Ook iedereen die een goede fysieke conditie nastreeft en een degelijke uithoudingsvermogen wenst op te bouwen.</p>',
                'order' => 5
            ],
            [
                'instructor_id' => 1,
                'title' => 'Cross Power',
                'slug' => 'cross-power',
                'description' => '<p>Cross Power is een modern cardio- en krachttrainingsprogramma dat gericht is op het verstevigen van de spieren en het verbranden van lichaamsvet in het gehele lichaam.</p><p>Cardio-trainingen zijn gericht op het versteken van je hart en om af te vallen. Krachttraining heeft hier als doel om het gehele lichaam sterker te maken.</p><p>Dit dynamische programma maakt gebruik van verschillende middelen zoals halters, kettlebells, battle ropes en wall balls.</p><p><u>Doelgroep</u>: indien je&nbsp;een degelijke&nbsp;conditie wenst&nbsp;op te bouwen&nbsp;dan is PPT een interessante optie. Het programma is voor iedereen toegankelijk, zeker indien je reeds over een basisconditie beschikt.</p>',
                'order' => 6
            ],
            [
                'instructor_id' => 6,
                'title' => 'Booty Workout',
                'slug' => 'booty-workout',
                'description' => '<p>De Booty Workout-lessen zijn specifiek gericht op het versterken van je buik, billen en benen. Ook andere lichaamsdelen zoals schouders, armen en rug komen meestal aan bod.</p><p>Een les begint met een warming-up sessie, waarna er spierversterkende oefeningen worden gedaan voor boven- en onderlichaam. Zo worden je buikspieren strakker, je billen steviger en je benen modieuzer &hellip; en dit in een gezellige sfeer met een leuke muziek.</p><p>Er wordt gewerkt met bijvoorbeeld gewichtjes en/of elastische banden.</p><p><u>Doelgroep</u>: indien je je algemene conditie wil verbeteren en een gezonde lichaamshouding wenst uit te stralen.</p>',
                'order' => 7
            ],
            [
                'instructor_id' => 1,
                'title' => 'Bodyshape',
                'slug' => 'bodyshape',
                'description' => '<p>Bodyshape is een spierversterkende les waar je je hele lichaam aanspreekt. De les is low-impact (dus geen springen) waarbij je lenigheid en je uithoudingsvermogen toenemen. De lessen zijn in tegenstelling tot andere lessen niet zo hoog in intensiteit.　</p><p><u>Doelgroep</u>: indien je aan je conditie wil werken op een gematigd niveau. Je wordt gemotiveerd door de gezellige sfeer binnen de les, met aangepaste muziek.</p>',
                'order' => 8
            ]
        );
    }
}
