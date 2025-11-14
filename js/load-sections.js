/* ============================================ */
/* CARGADOR DE SECCIONES - FHADDEV CHILE */
/* ============================================ */
/* 
⚠️ CRÍTICO - NO MODIFICAR
Este archivo carga automáticamente todas las secciones HTML

Si modificas este archivo, el sitio dejará de funcionar.
Para agregar/quitar secciones, contacta al programador.
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Iniciando carga de secciones...');
    
    const sections = [
        { id: 'header-container', file: 'sections/header.html' },
        { id: 'whatsapp-container', file: 'sections/whatsapp-button.html' },
        { id: 'hero-container', file: 'sections/hero.html' },
        { id: 'nosotros-container', file: 'sections/nosotros.html' },
        { id: 'que-hacemos-container', file: 'sections/que-hacemos.html' },
        { id: 'programas-container', file: 'sections/programas.html' },
        { id: 'equipo-container', file: 'sections/equipo.html' },
        { id: 'donaciones-container', file: 'sections/donaciones.html' },
        { id: 'contacto-container', file: 'sections/contacto.html' },
        { id: 'footer-container', file: 'sections/footer.html' }
    ];

    let loadedCount = 0;
    const totalSections = sections.length;

    // Cargar todas las secciones usando Promise.all para esperar a que terminen
    const loadPromises = sections.map(section => {
        return fetch(section.file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = data;
                    loadedCount++;
                    console.log(`✅ ${section.file} cargado (${loadedCount}/${totalSections})`);
                } else {
                    console.error(`❌ Contenedor con ID '${section.id}' no encontrado.`);
                }
            })
            .catch(error => {
                console.error(`❌ Error al cargar ${section.file}:`, error);
            });
    });

    // Esperar a que TODAS las secciones se carguen antes de inicializar
    Promise.all(loadPromises).then(() => {
        console.log('🎉 Todas las secciones han sido cargadas exitosamente.');
        
        // Disparar evento personalizado para notificar que las secciones están listas
        const sectionsLoadedEvent = new CustomEvent('sectionsLoaded');
        document.dispatchEvent(sectionsLoadedEvent);
        
        console.log('📡 Evento sectionsLoaded disparado');
    });
});
