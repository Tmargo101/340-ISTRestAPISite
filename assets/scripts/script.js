//api:  http://www.ist.rit.edu/api/

function loadSection(content) {
	
	if (content == "about") {
		console.log("load about section");
		//Load the about section
		
		xhr('get',{path:'/about/'}, '#about').done(function(json){
			var output = '<div id="aboutDiv">';
			output += '<h2>' + json.title + '</h2>';
			output += '<p>' + json.description + '</p>';
			output += '<p><i><b>"' + json.quote + '"</b></i></p>';
			output += '<p>~' + json.quoteAuthor + '</p></div>';
			$('#aboutContent').append(output);
		});
		
	} else if (content == "degrees") {
		console.log("load degrees section");
		// Load the degrees section
		
		xhr('get',{path:'/degrees/'},'#content').done(function(json){
			$.each(json.undergraduate, function(i, item){
				var output = '';
				output = output + '<h3>' + this.title + '</h3><div>';
				output = output + '<h4>' + this.description + '</h4>';
				output = output + '<h4>Concentrations:</h4>'
					
				$.each(this.concentrations, function (i, item) {	
					output = output + '<p><u>' + this + '<u><p>';

				});
				output = output + '</div>';
				
				$('#undergradDegreesContent').append(output);	

			}); //End of undergradDegrees
			
			//Make undergradDegreesContent an accordion
			$(function(){
				$("#undergradDegreesContent").accordion();
			});

			$.each(json.graduate, function(i, item){
				var output = '';
				if(this.title) {
					output = output + '<h3>' + this.title + '</h3><div>';
					output = output + '<p>' + this.description + '</p>';
					output = output + '<h4>Concentrations:</h4>'
					
					$.each(this.concentrations, function (i, item) {	
						output = output + '<p><u>' + this + '</u><p>';
					});

				} else {
// 					output = output + '<h3>' + this.degreeName + '</h3>';
				}
				output = output + "</div>"
				$('#gradDegreesContent').append(output);								
			}); //End of gradDegrees

			//Make gradDegreesContent an accordion
			$(function(){
				$("#gradDegreesContent").accordion();
			});
			
		});	//End of(get degrees)
		
	} else if (content == "minors") {
		//Load minors
		
		console.log("load minors section");

		xhr('get',{path:'/minors/'},'#minors').done(function(json){
						
			$.each(json.UgMinors, function (i, item){
				var output = '';
				output += '<h3>' + this.title + '</h3>\n<div>';
				output += '<p>' + this.description + '</p>';
				output += '</div>';
				$('#minorsContent').append(output);
			});	
			$(function(){
				$("#minorsContent").accordion({collapsible:true,active:'none'});
			});

		});//End of XHR

	} else if (content == "faculty") {
		
		xhr('get',{path:'/people/faculty/'},'#faculty').done(function(json){
		console.log("load faculty section");
			
			$.each(json.faculty, function(i, item){
				var output = '';
				output += '<div class="facultyImage" data-uname="'+ this.username + '"><h3>' + this.name + '</h3>';
				output += '<img src="' + this.imagePath + '" height="100px"></img></div>';
				$('#facultyContent').append(output);
			});//End of Each
			
			//Assign the facultyImages a click function
			$('.facultyImage').on('click', function() {
				var clickedFaculty = getAttributesByName(json.faculty, 'username', $(this).attr('data-uname'));
// 				console.log(clickedFaculty);
				var facultyDialogBox = '<div id="dialogBox", title="' + clickedFaculty.name + '">';
				if(clickedFaculty.imagePath){ facultyDialogBox += '<img src="' + clickedFaculty.imagePath + '" height="100px"><br>'};

				if(clickedFaculty.tagline){ facultyDialogBox += '<h4>' + clickedFaculty.tagline + '</h4><br>'};
				if(clickedFaculty.title){ facultyDialogBox += '<h4><b>Title:</b> ' + clickedFaculty.title + ' </h4><br>';}
				if(clickedFaculty.username){ facultyDialogBox += '<b>Username:</b> ' + clickedFaculty.username + '<br>';}
				if(clickedFaculty.email){ facultyDialogBox += '<b>Email:</b> <a href="mailto:' + clickedFaculty.email + '">' + clickedFaculty.email + '</a><br>';}
				if(clickedFaculty.office){ facultyDialogBox += '<b>Office:</b> ' + clickedFaculty.office + '<br>';}
				if(clickedFaculty.phone){ facultyDialogBox += '<b>Phone:</b> ' + clickedFaculty.phone + '<br>';}
				if(clickedFaculty.interestArea){facultyDialogBox += '<b>Interests:</b> ' + clickedFaculty.interestArea + '<br>';}
				if(clickedFaculty.website) { facultyDialogBox += '<b>Website:</b> <a href="' + clickedFaculty.website + '">' + clickedFaculty.website + '</a><br>';}
				if(clickedFaculty.twitter) { facultyDialogBox += '<b>Twitter:</b>' + clickedFaculty.twitter + '</a><br>';}
				if(clickedFaculty.facebook) { facultyDialogBox += '<b>Facebook:</b>' + clickedFaculty.facebook + '</a><br>';}


				facultyDialogBox += '</div>';
				
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(facultyDialogBox);
				$('#dialogBox').dialog({
					modal: true,
				});
				$('#dialogBox').dialog('open');
			});
			
		});//End of XHR

	} else if (content == "staff") {
		console.log("load staff section");
		xhr('get',{path:'/people/staff/'},'#staff').done(function(json){
			
			$.each(json.staff, function(i, item){
				var output = '';
				output += '<div class="staffImage" data-uname="'+ this.username + '"><h3>' + this.name + '</h3>';
				output += '<img src="' + this.imagePath + '" height="100px"></img></div>';
				$('#staffContent').append(output);
			});//End of Each
			
			//Assign the facultyImages a click function
			$('.staffImage').on('click', function() {
				var clickedStaff = getAttributesByName(json.staff, 'username', $(this).attr('data-uname'));
// 				console.log(clickedStaff);
				var staffDialogBox = '<div id="dialogBox", title="' + clickedStaff.name + '">';
				if(clickedStaff.imagePath){ staffDialogBox += '<img src="' + clickedStaff.imagePath + '" height="100px"><br>'};

				if(clickedStaff.tagline){ staffDialogBox += '<h4>' + clickedStaff.tagline + '</h4><br>'};
				if(clickedStaff.title){ staffDialogBox += '<h4><b>Title:</b> ' + clickedStaff.title + ' </h4><br>';}
				if(clickedStaff.username){ staffDialogBox += '<b>Username:</b> ' + clickedStaff.username + '<br>';}
				if(clickedStaff.email){ staffDialogBox += '<b>Email:</b> <a href="mailto:' + clickedStaff.email + '">' + clickedStaff.email + '</a><br>';}
				if(clickedStaff.office){ staffDialogBox += '<b>Office:</b> ' + clickedStaff.office + '<br>';}
				if(clickedStaff.phone){ staffDialogBox += '<b>Phone:</b> ' + clickedStaff.phone + '<br>';}
				if(clickedStaff.interestArea){staffDialogBox += '<b>Interests:</b> ' + clickedStaff.interestArea + '<br>';}
				if(clickedStaff.website) { staffDialogBox += '<b>Website:</b> <a href="' + clickedStaff.website + '">' + clickedStaff.website + '</a><br>';}
				if(clickedStaff.twitter) { staffDialogBox += '<b>Twitter:</b>' + clickedStaff.twitter + '</a><br>';}
				if(clickedStaff.facebook) { staffDialogBox += '<b>Facebook:</b>' + clickedStaff.facebook + '</a><br>';}


				staffDialogBox += '</div>';
				
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(staffDialogBox);
				$('#dialogBox').dialog({
					modal: true
				});
				$('#dialogBox').dialog('open');
			});
			
		});//End of XHR
		
	} else if (content == "employment") {
		
		console.log("load employment section");
		xhr('get',{path:'/employment/'},'#employment').done(function(json){
// 			console.log(json);
			
			//Setup degree statistics
			$.each(json.degreeStatistics.statistics, function(i, item){
				var output = '<div class="statsDiv">';
				output += '<h2>' + this.value + '</h2>';
				output += '<p>' + this.description + '</p>';
				$('#employmentStatisticsContent').append(output);
			});//End of degree statistics
			
			//Setup & output employment about section
			var aboutOutput = '<div id="employmentAboutDiv">';
			aboutOutput += '<h2>' + json.introduction.title+ '</h2>';
			$.each(json.introduction.content, function(i, item){
				aboutOutput += '<h3>' + this.title + '</h3>';
				aboutOutput += '</p>' + this.description + '</p>';
			});//End of Each
			aboutOutput += '</div>';
			$('#employmentAboutContent').append(aboutOutput);
			
			//Setup & output about - careers section
			var aboutCareersOutput = '<div id="employmentAboutCareersDiv">';
			aboutCareersOutput += '<h2>' + json.careers.title+ '</h2>';
			$.each(json.careers.careerNames, function(i, item){
				aboutCareersOutput += '<h4>' + this + '</h4>';
			});//End of Each
			aboutCareersOutput += '</div>';
			$('#employmentAboutCareersContent').append(aboutCareersOutput);
			
			//Setup & output about - careers section
			var aboutEmployersOutput = '<div id="employmentAboutCareersDiv">';
			aboutEmployersOutput += '<h2>' + json.employers.title+ '</h2>';
			$.each(json.employers.employerNames, function(i, item){
				aboutEmployersOutput += '<h4>' + this + '</h4>';
			});//End of Each
			aboutEmployersOutput += '</div>';
			$('#employmentAboutEmployersContent').append(aboutEmployersOutput);
			
			$('#showCoopTable').on('click', function() {
				//Setup and display table of co-ops
				var coopArray = []
				$.each(json.coopTable.coopInformation, function(i, item){
					var output = '<tr><td>' + this.employer + '</td><td>' + this.degree + '</td><td>' + this.city + '</td><td>' + this.term + '</td></tr>';
					coopArray.push(output);
				});
				
				var coopTableOutput = '<div id="dialogBox" title="Co-op Employment Records"><table id="coopTableMain"><thead><th>Employer</th><th>Major</th><th>Location</th><th>Semester</th></thead><tbody>';
				$.each(coopArray, function(i, item) {
					coopTableOutput += this;
				});
				coopTableOutput += '</tbody></table></div>';
	
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(coopTableOutput);
				$('#coopTableMain').fancyTable({
					pagination: true,
					paginationClass: "btn btn-light",
					paginationClassActive: "active",
					pagClosest: 3,
					perPage: 10,	
				});
				
				$('#dialogBox').dialog({
					modal: true,
					height: 550,
					width: 750
				});
				$('#dialogBox').dialog('open');

			});
			
			$('#showEmploymentTable').on('click', function() {
				//Setup and display table of co-ops
				var employmentArray = []
				$.each(json.employmentTable.professionalEmploymentInformation, function(i, item){
					var output = '<tr><td>' + this.employer + '</td><td>' + this.degree + '</td><td>' + this.city + '</td><td>' + this.title + '</td></tr>';
					employmentArray.push(output);
				});
				
				var employmentTableOutput = '<div id="dialogBox" title="Full Time Employment Records"><table id="employmentTableMain"><thead><th>Employer</th><th>Major</th><th>Location</th><th>Semester</th></thead><tbody>';
				$.each(employmentArray, function(i, item) {
					employmentTableOutput += this;
				});
				employmentTableOutput += '</tbody></table></div>';
	
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(employmentTableOutput);
				$('#employmentTableMain').fancyTable({
					pagination: true,
					paginationClass: "btn btn-light",
					paginationClassActive: "active",
					pagClosest: 3,
					perPage: 10,	
				});
				
				$('#dialogBox').dialog({
					modal: true,
					height: 550,
					width: 750

				});
				$('#dialogBox').dialog('open');

			});
						
		});//End of XHR
		
	} else if (content == "research") {
		
		console.log('Load research section');
		xhr('get',{path:'/research/'},'#research').done(function(json){
// 			console.log(json);
			
			$.each(json.byFaculty, function(i, item){
				var output = '';
				output += '<p class="researchFaculty" data-username="' + this.username + '">' + this.facultyName + '</p>';
				$('#researchContent-1').append(output);
			});//End of Each
			
			$.each(json.byInterestArea, function(i, item){
				var output = '';
				output += '<p class="researchInterests" data-areaName="' + this.areaName + '">' + this.areaName + '</p>';
				$('#researchContent-2').append(output);
			});//End of Each
			$('#researchContent').tabs();
			
			$('.researchFaculty').on('click', function() {
				var clickedResearch = getAttributesByName(json.byFaculty, 'username', $(this).attr('data-username'));
				var researchDialogBox = '<div id="dialogBox">';
				
				$.each(clickedResearch.citations, function (i, item){
					researchDialogBox += '<p>' + this + '</p>';
				});
				researchDialogBox += '</div>'
				
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(researchDialogBox);
				$('#dialogBox').dialog({
					modal: true,
					width: 1000,
					maxHeight: 700
				});
				$('#dialogBox').dialog('open');
			});
			
			$('.researchInterests').on('click', function() {
				var clickedResearch = getAttributesByName(json.byInterestArea, 'areaName', $(this).attr('data-areaName'));
				var researchDialogBox = '<div id="dialogBox">';
				
				$.each(clickedResearch.citations, function (i, item){
					researchDialogBox += '<p>' + this + '</p>';
				});
				researchDialogBox += '</div>'
				
				//Remove the dialog box from the screen if it is already there
				if ($('#dialogBox')){
					$('#dialogBox').remove();
				}
				//Add the dialog box to the page and open it
				$(document.body).append(researchDialogBox);
				$('#dialogBox').dialog({
					modal: true,
					width: 1000,
					maxHeight: 700
				});
				$('#dialogBox').dialog('open');
			});

		});//End of XHR
		

		
	} else if (content == "resources") {
		console.log('Didnt get to resources section.');
		xhr('get',{path:'/resources/'},'#resources').done(function(json){
			console.log(json);
			
		});//End of XHR
		
	} else if (content == "footer") {
		console.log('Load footer section');
		
		xhr('get',{path:'/footer/'},'#footer').done(function(json){
			var quickLinksOutput = '<div id="footerQuickLinks">'
			$.each(json.quickLinks, function (i, item) {
				quickLinksOutput += '<p><a href="' + this.href + '">' + this.title + '</a></p>';
			});
			quickLinksOutput += '</div>'
			$('#footerContent').append(quickLinksOutput)
			
			var socialOutput = '<div id="footerSocial"><h5>' + json.social.title + '</h5><h6>' + json.social.tweet + '</h6><a href="' + json.social.facebook + '">Facebook</a><a href="' + json.social.twitter + '">Twitter</a>';
			$('#footerContent').append(socialOutput);
			
			
			
			var copyrightOutput = '<div id="footerCopyright"><h5>' + json.copyright.title + '</h5>' + json.copyright.html + '</div>';
			$('#footerContent').append(copyrightOutput)

		});//End of XHR
			
	}




	
}
	
